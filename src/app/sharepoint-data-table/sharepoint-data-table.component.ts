import { Component, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpStatus } from '../common/http-status';
import { SitesModal } from '../common/siteModal';
import { SHARE_POINTS_SERVICE, ISharePointService } from '../Ishare-point.service';
import { ProviderList } from '../app-provider-registrar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FinanceExample } from '../finance-example/finance-example.component';
import { AgGridAngular } from '@ag-grid-community/angular';
import { TickerCellRenderer } from '../finance-example/cell-renderers/ticker-cell-renderer.component';
import { ColDef, GetRowIdFunc, GetRowIdParams, GridReadyEvent, ModuleRegistry, ValueFormatterFunc, ValueGetterParams } from '@ag-grid-community/core';
import { getData } from '../finance-example/data';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AdvancedFilterModule } from '@ag-grid-enterprise/advanced-filter';
import { GridChartsModule } from '@ag-grid-enterprise/charts-enterprise';
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
import { NgxUiLoaderModule } from "ngx-ui-loader";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  AdvancedFilterModule,
  ColumnsToolPanelModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  GridChartsModule,
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

@Component({
  selector: 'app-sharepoint-data-table',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterModule,AgGridAngular,NgxUiLoaderModule, TickerCellRenderer,FinanceExample,],
  templateUrl: './sharepoint-data-table.component.html',
  styleUrls: ['./sharepoint-data-table.component.css'],
   providers:[ProviderList]
})
export class SharepointDataTableComponent {
   @Input() gridTheme: string = 'ag-theme-quartz';
    @Input() isDarkMode: boolean = false;
    last24 = [
      -0.03, -0.01, -0.05, -0.02, 0.02, -0.02, 0.03, -0.02, -0.03, 0.3, 0.17,
      0.18, 0.23, 0.16, 0.23, 0.25, 0.16, 0.21, 0.17, 0.24, 0.24, 0.2, 0.23,
      0.25, 0.24, 0.18, 0.25, 0.21, 0.35, 0.38, 0.4, 0.42, 0.4, -0.35, -0.36,
      -0.41, -0.19, -0.14, -0.17, -0.13, -0.14, -0.16, -0.11, -0.19, -0.12,
      -0.17, -0.12, -0.14, -0.15, -0.07, -0.05, -0.07, -0.02, -0.24, -0.3,
      -0.24, -0.32, -0.25, -0.27, -0.31,
    ]
    themeClass = `${this.gridTheme}${this.isDarkMode ? '-dark' : ''}`;

    rowData = getData();
    getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.ticker;
    onGridReady(params: GridReadyEvent) {
      setInterval(() => {
        this.rowData = this.rowData.map((item:any) =>
          Math.random() < 0.1
            ? {
              ...item,
              price:
                item.price +
                item.price *
                ((Math.random() * 4 + 1) / 100) *
                (Math.random() > 0.5 ? 1 : -1),
            }
            : item,
        );
      }, 1000);
    }
    enableRangeSelection: boolean = true;
    rowSelection: 'multiple' | 'single' | undefined = 'multiple';
    enableCharts: boolean = true;
    rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' | undefined =
      'always';
    suppressAggFuncInHeader: boolean = true;
    groupDefaultExpanded = -1;

    defaultColDef: ColDef = {
      flex: 1,
      filter: true,
      enableRowGroup: true,
      enableValue: true,
    };
    colDefs: ColDef[] = [
    ];

    statusBar = {
      statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent' },
        { statusPanel: 'agTotalRowCountComponent' },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    };
 sitesModel: SitesModal = new SitesModal();
  sitesData:any
  fileUrl: string='';
  constructor(
    @Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService, private router :Router,private activateRoute:ActivatedRoute
  ) {
    this.activateRoute.paramMap.subscribe(res=>{
     this.fileUrl = res.get("fileUrl")?.toString() ?? ''
    })
  }

navigate(id:string){
  debugger
  this.router.navigate(["/drive-item",id])
}
  ngOnInit(): void {
    this.getAllSites();
  }
  getAllSites() {
    this.sharePointService.viewDrivesfile(this.fileUrl).subscribe((res) => {
      if (res.Status == HttpStatus.Success) {
        debugger
        this.sitesModel = res.Data.Value;
        this.sitesData= res.Data.Value;
      }
    });
  }
}
