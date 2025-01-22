import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  GridOptions,
  type ColDef,
  type GetRowIdFunc,
  type GetRowIdParams,
  type GridReadyEvent,
  type ValueFormatterFunc,
  type ValueGetterParams,
} from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AdvancedFilterModule } from '@ag-grid-enterprise/advanced-filter';
//  import { GridChartsModule } from '@ag-grid-enterprise/chngarts-enterprise';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
// import '@ag-grid-community/styles/ag-grid.css';
// import '@ag-grid-community/styles/ag-theme-quartz.css';
import { getData } from './data';

import { TickerCellRenderer } from './cell-renderers/ticker-cell-renderer.component';
import { HttpStatus } from '../common/http-status';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../Ishare-point.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SitesModal } from '../common/siteModal';
import { ProviderList } from '../app-provider-registrar';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderService, PB_DIRECTION, POSITION, SPINNER } from "ngx-ui-loader";
import { sparklineTooltipRenderer } from './cell-renderers/sparklineTooltipRrnderer';
// import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  AdvancedFilterModule,
  ColumnsToolPanelModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  // GridChartsModule,
  MenuModule,
  RangeSelectionModule,
  RowGroupingModule,
  SetFilterModule,
  RichSelectModule,
  StatusBarModule,
  SparklinesModule,
]);

const numberFormatter: ValueFormatterFunc = (params) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 2,
  });
  return params.value == null ? '' : formatter.format(params.value);
};
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};
@Component({
  selector: 'finance-example',
  standalone: true,
  imports: [AgGridAngular, TickerCellRenderer,HttpClientModule, NgxUiLoaderModule],
  templateUrl: './finance-example.component.html',
  styleUrls: ['./finance-example.component.css'],
  encapsulation: ViewEncapsulation.None,
    providers:[ProviderList]
})
export class FinanceExample {
  @Input() gridTheme: string = 'ag-theme-quartz';
  @Input() isDarkMode: boolean = false;

  themeClass = `${this.gridTheme}${this.isDarkMode ? '-dark' : ''}`;
  enableCharts: boolean = true;
  rowData: any[] = [];
  colDefs: ColDef[] = [];
   DEFAULT_UPDATE_INTERVAL = 60;
   PERCENTAGE_CHANGE = 20;
  sitesData: any[] = [];
  fileUrl: string = '';

  statusBar = {
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent' },
      { statusPanel: 'agTotalRowCountComponent' },
      { statusPanel: 'agFilteredRowCountComponent' },
      { statusPanel: 'agSelectedRowCountComponent' },
      { statusPanel: 'agAggregationComponent' },
    ],
  };
  last24 =  [
    103.53, 100.45, 72.77, 74.83, 66.63, 59.45, 63.55, 61.5, 68.67, 64.58,
    133.25, 132.22, 77.9, 78.92, 71.75, 76.88, 69.7, 76.88, 77.9, 114.8,
    119.92, 113.78, 114.8, 126.08,
  ]
  constructor(
    @Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService,private ngxService: NgxUiLoaderService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {

    this.activateRoute.paramMap.subscribe(res => {
      this.fileUrl = res.get("fileUrl")?.toString() ?? '';
    });
  }
  gridOptions: GridOptions = {
    enableCharts: true,  // Enable charting in the grid
    chartThemes: ['dark', 'material'],  // Add desired chart themes
    defaultColDef: {
      resizable: true,
      sortable: true,
    },
    enableRangeSelection: true,  // Enable range selection for charting
  };

  ngOnInit(): void {
    this.ngxService.start();
    this.getAllSites();
  }

  // Fetch data from API
  getAllSites() {
    debugger
    this.sharePointService.viewDrivesfile(this.fileUrl).subscribe((res) => {
        debugger
        // this.sitesData = res.Data.Value;
        this.prepareGridData(res);
        this.ngxService.stop();
    });
  }
  // Prepare columnDefs and rowData for AG Grid
  prepareGridData(data: any) {
    debugger;
    // Check if the data is valid and has the required fields
    if (data && Object.keys(data).length > 0) {
      // Get all keys of the data object (e.g., Id, name)
      const keys = Object.keys(data);

      // Dynamically create column definitions based on the keys
      this.colDefs = keys.map((key) => ({
        headerName: key, // Column header is the key (e.g., 'Id', 'name')
        field: key,      // The field is the same as the key (which matches the row data)
        sortable: true,
        filter: true,
      }));
      // Check if the data arrays are of the same length
      const rowCount = data[keys[0]].length;  // Get the length of the first array in the data object

      // Flatten data and prepare rows
      this.rowData = Array.from({ length: rowCount }, (_, index) => {
        const flattenedRow: any = {};

        // Loop through each key in the data object and assign the corresponding value to the row
        keys.forEach((key) => {
          // Assign the value from the data[key] array at the current index
          flattenedRow[key] = data[key][index];
        });
        // Add the 'last24' value from the array, ensuring the index is valid
        return flattenedRow;
      });
    }
  }



// prepareGridData(data: any) {
//   debugger;
//   if (data && data.length > 0) {
//     // Dynamically generate columns based on the keys
//     const keys = Object.keys(data[0]);
//     this.colDefs = keys.map((key) => {
//       const field = key.split('.').pop() || key;  // Handle nested keys like "admin.excel.purcheorderhistory.casestatus"

//       // Check the DataType and decide whether to show a chart or not
//       const columnDef: any = {
//         headerName: field,  // Column name
//         field: key,  // Field name to match in rowData
//         sortable: true,
//         filter: true,
//       };

//       // Check DataType for chart rendering
//       const dataType = data[0][key]?.DataType;
//       if (dataType == 'Double' || dataType == 'Integer') {
//         columnDef.cellRenderer = 'agSparklineCellRenderer';  // Enable sparkline for numeric fields
//         columnDef.cellRendererParams = {
//           sparklineOptions: {
//             type: 'bar',
//             direction: 'vertical',
//             axis: {
//               strokeWidth: 0,
//             },
//             tooltip: {
//               renderer: sparklineTooltipRenderer,  // Optional tooltip for the chart
//             },
//           },
//         };
//       }

//       return columnDef;
//     });

//     // Flatten data for rows and add 'last24' or other numeric data
//     this.rowData = data.map((item: any, index: number) => {
//       const flattenedRow: any = {};
//       for (const key in item) {
//         if (item.hasOwnProperty(key)) {
//           flattenedRow[key] = item[key]?.Value;  // Extract 'Value' from the nested structure
//         }
//       }

//       // Example: Add the 'last24' column or any numeric data here, if applicable
//       // Assuming `this.last24` exists as an array and needs to be used in rowData.
//       flattenedRow['last24'] = Array.isArray(this.last24) ? this.last24 : [this.last24]; // Ensure it's an array of numbers

//       return flattenedRow;
//     });
//   }
// }



  // Grid ready callback to manage grid initialization
  onGridReady(params: GridReadyEvent) {


    setInterval(() => {
      this.rowData = this.rowData.map((item) => {
        const isRandomChance = Math.random() < 0.1;

        if (!isRandomChance) {
          return item;
        }
        const rnd = (Math.random() * this.PERCENTAGE_CHANGE) / 100;
        const change = Math.random() > 0.5 ? 1 - rnd : 1 + rnd;
        const price =
          item.last24 < 10
            ? item.last24 * change
            : // Increase price if it is too low, so it does not hang around 0
              Math.random() * 40 + 10;

        const last24 = item.last24
          .slice(1, item.Amount.length)
          .concat(Number(price.toFixed(2)));

        return {
          ...item,
          price,
          last24,
        };
      });
    }, this.DEFAULT_UPDATE_INTERVAL);// Adjust column sizes to fit content
  }

  // Handle row click to navigate
  navigate(id: string) {
    this.router.navigate(["/drive-item", id]);
  }
}
