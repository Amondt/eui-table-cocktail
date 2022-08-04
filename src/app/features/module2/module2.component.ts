import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { EuiTableComponent } from '@eui/components-next';

@Component({
    // tslint:disable-next-line
    selector: 'module2',
    templateUrl: './module2.component.html',
    styles: [`
    .my-highlight {
        background-color: var(--eui-color-danger-lightester);
        font-weight: bold;
        text-decoration: underline;
    }
    `],
    encapsulation: ViewEncapsulation.None,
})
export class Module2Component implements OnInit {
    constructor(private http: HttpClient) { }

    public dataSource: any[] = [];
    public filteredData: any[] = [];

    // @ViewChild('euiTable') euiTable: EuiTableComponent;
    @ViewChild('euiTable') euiTable;

    ngOnInit() {
        this.http.get("https://randomuser.me/api/?results=50").subscribe((res: any) => {
            console.log(res.results);

            this.dataSource = res.results;
            this.filteredData = this.dataSource;
        })
        // http://www.thecocktaildb.com/api/json/v1/1/random.php
    }

    public onFilterChange(event: any) {
        this.filteredData = this.euiTable.filterRows(event, this.dataSource);
    }
}
