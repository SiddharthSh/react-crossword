import { ChipData } from "../components";

export interface GridResponse {
  disabled: boolean;
  rows: number;
  gridValue: string | null;
  userValue: string | null;
  isCorrect?: boolean;
  acrossCode?: string;
  downCode?: string;
}

export class GridHelper {
  public gridData: ChipData[] = [];
  public GridResponse: GridResponse[] = [];

  // We can get the input form the server if required just place an API call into the constructor of this class to initialise it.
  public GridInput: (string | null)[][] = [
    [null, null, null, null, null, null,  'A', null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null,  'P', null, null, null, null, null, null, null, null],
    [ 'A',  'U',  'T',  'H',  'O',  'R',  'I',  'N',  'G', null, null, null, null, null, null],
    [ 'N', null, null, null, null, null, null, null, null, null, null,  'F', null, null, null],
    [ 'A', null,  'J', null, null, null, null, null, null, null, null,  'R', null, null, null],
    [ 'L',  'E',  'A',  'R',  'N',  'O',  'S',  'I',  'T',  'Y', null,  'O', null, null, null],
    [ 'Y', null,  'V', null, null, null, null, null, null, null, null,  'N', null, null, null],
    [ 'T', null,  'A',  'S',  'S',  'E',  'S',  'S',  'M',  'E',  'N',  'T', null, null, null],
    [ 'I', null,  'S', null, null, null, null, null, null, null, null,  'E', null, null, null],
    [ 'C', null,  'C', null, null, null, null, null,  'S',  'Y',  'D',  'N',  'E',  'Y', null],
    [ 'S', null,  'R', null, null, null, null, null, null, null, null,  'D', null, null, null],
    [null, null,  'I', null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null,  'P', null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null,  'T', null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transpose(array: any[][]) {
    return array.reduce((prev, next) => next.map((item, i) =>
        (prev[i] || []).concat(next[i])
    ), []);
  }

  public gridMaker = (): GridResponse[] => {
    try {
      const grids: GridResponse[] = [];
      let group: string;
      for (let i=0; i<this.GridInput.length; i++) {
        // get Each row from the 2D array and do another loop to build the Interface.
        const row = this.GridInput[i];
        for (let j=0; j<row.length; j++) {
          if (row[j] && (row[j-1] || row[j+1])) {
            group = row[j] ? `r${i}` : '';
          } else {
            group = '';
          }
          grids.push({
            disabled: row[j] ? false : true,
            rows: i,
            gridValue: row[j],
            acrossCode: group,
            userValue: null,
          });
        }
      }

      // Transposing the grid to get the DownGroup for the words.
      const transGrids: GridResponse[] = [];
      const transpose = this.transpose(this.GridInput);
      for (let i=0; i<this.GridInput.length; i++) {
        // get Each row from the 2D array and do another loop to build the Interface.
        const row = transpose[i];
        if (row) {
          for (let j=0; j<row.length; j++) {
            if (row[j] && (row[j-1] || row[j+1])) {
              group = row[j] ? `d${i}` : '';
            } else {
              group = '';
            }
            // by Interchanging the i and j to the row and cols for the trasnpose Array will re transpose back into the original Tile object making it easier for naming.
            transGrids.push({
              disabled: row[j] ? false : true,
              rows: j,
              gridValue: row[j],
              downCode: group,
              userValue: null,
            });
          }
        }
      }

      // Sorting by the rows to get the same order as actual grid.
      const sortTransGrid = transGrids.sort(function(a, b) {
        return a.rows - b.rows;
      })

      // Map using spread operator to create the list to render on UI with all groug associated with across and down.
      this.GridResponse = grids.map((x, index) => {
        return { ...x,  ...sortTransGrid[index]};
      });

      return this.GridResponse;
    } catch (exception) {
      // Error handling for generic errors
      console.log(exception);
      return [];
    }
  };

  public Validate(): void {
    // Get the correct match from the grid.
    const correctGridResponse = this.GridResponse.filter((eachGrid) => eachGrid.gridValue === eachGrid.userValue);
    
    // Create the Map for Across Grid
    const corrctAcrossFromGrid = this.getUniqueAcrossSet(correctGridResponse);
    
    // Iterate the correct across grid to check if all Alphabets matches the original grid.
    for (let row = 0; row < corrctAcrossFromGrid.length; row++) {

      // Across will be correct only if the length of the correctGridReponse matches with the actual number of grid exist in GridResponse, if matches update the grid data with validity.
      if (this.GridResponse.filter((grid) => grid.acrossCode === corrctAcrossFromGrid[row]).length === correctGridResponse.filter((grid) => grid.acrossCode === corrctAcrossFromGrid[row]).length) {
        this.gridData = this.gridData.map((data) => (data.code === corrctAcrossFromGrid[row] ? { ...data, valid: true } : data));
      } else {
        this.gridData = this.gridData.map((data) => (data.code === corrctAcrossFromGrid[row] ? { ...data, valid: false } : data));
      }
    }

    // Same exercise do for Down in the crossword.
    const correctDownFromGrid = this.getUniqueDownSet(correctGridResponse);

    for (let row = 0; row < correctDownFromGrid.length; row++) {
      if (this.GridResponse.filter((grid) => grid.downCode === correctDownFromGrid[row]).length === correctGridResponse.filter((grid) => grid.downCode === correctDownFromGrid[row]).length) {
        this.gridData = this.gridData.map((data) => (data.code === correctDownFromGrid[row] ? { ...data, valid: true } : data));
      } else {
        this.gridData = this.gridData.map((data) => (data.code === correctDownFromGrid[row] ? { ...data, valid: false } : data));
      }
    }
    // Print the result in the console for validity. ALthough Correct Words from the Grid wil be highlighted in the Chip LIst as well :)
    console.log(this.gridData);
  }

  getUniqueAcrossSet(fromArray: GridResponse[]): (string | undefined)[] {
    return Array.from(new Set(fromArray.map((item) => item.acrossCode))).filter((value) => value !== '')
  }

  getUniqueDownSet(fromArray: GridResponse[]): (string | undefined)[] {
    return Array.from(new Set(fromArray.map((item) => item.downCode))).filter((value) => value !== '')
  }

  createWordMapAcrossFromGrid(code?: string): string {
    if (code) {
      return this.GridResponse.filter((grid) => grid.acrossCode === code).map((grid) => grid.gridValue).join('');
    }
  
    return '';
  }

  createWordMapDownFromGrid(code?: string): string {
    if (code) {
      return this.GridResponse.filter((grid) => grid.downCode === code).map((grid) => grid.gridValue).join('');
    }

    return '';
  }

  // Dynamic creation of result setof words from the Input Grid 2D. :)
  createCrosswordResultSet(): ChipData[] {
    if (!this.gridData.length) {
      const acrossArray = this.getUniqueAcrossSet(this.GridResponse);
      for (let index = 0; index < acrossArray.length; index++) {
        this.gridData.push({
          code: acrossArray[index],
          label: this.createWordMapAcrossFromGrid(acrossArray[index]),
        })
      }

      const downArray = this.getUniqueDownSet(this.GridResponse);
      for (let index = 0; index < downArray.length; index++) {
        this.gridData.push({
          code: downArray[index],
          label: this.createWordMapDownFromGrid(downArray[index]),
        })
      }
    }
    return this.gridData;
  }
}
