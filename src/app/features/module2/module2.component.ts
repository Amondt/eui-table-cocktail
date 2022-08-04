import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UxAppShellService } from '@eui/core';
import { EuiTableComponent } from '@eui/components/eui-table';
import { UxLink } from '@eui/base';

@Component({
    // tslint:disable-next-line
    selector: 'module2',
    templateUrl: './module2.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class Module2Component implements OnInit {

    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';
    summaryTitle = "";
    messageDetail = "";

    public isCompact: boolean = false;

    public dataSource: any[] = [];
    public filteredData: any[] = [];

    public form: FormGroup;
    public colsValues: UxLink[] = [
        new UxLink({ label: 'Title', id: 'title' }),
        new UxLink({ label: 'First name', id: 'first' }),
        new UxLink({ label: 'Last name', id: 'last' }),
        new UxLink({ label: 'Nationality', id: 'nat' }),
        new UxLink({ label: 'Email', id: 'email' }),
        new UxLink({ label: 'Phone', id: 'phone' }),
        new UxLink({ label: 'Date of birth', id: 'dob' }),
    ];
    public visibleCols = ['title', 'first', 'last', 'nat', 'email', 'phone', 'dob'];

    @ViewChild('euiTable') euiTable: EuiTableComponent;

    constructor(private http: HttpClient, private fb: FormBuilder, private asService: UxAppShellService) { }

    ngOnInit() {
        this.http.get("https://randomuser.me/api/?results=50").subscribe((res: any) => {
            console.log(res.results);

            this.dataSource = res.results;
            this.filteredData = this.dataSource;
        })

        this.form = this.fb.group({
            colsFilter: new FormControl(this.colsValues),
        });
        this.form.get('colsFilter').valueChanges.subscribe((values: UxLink[]) => {
            this.visibleCols = values.map(v => v.id);
        });
    }

    public onFilterChange(event: any) {
        this.filteredData = this.euiTable.filterRows(event, this.dataSource);
    }

    public onRowDetail(row: any) {
        console.log('onRowDetail() selected row:', row);
        this.summaryTitle = "Detail item";
        this.messageDetail = JSON.stringify(row.name);
        this.showGrowl('info');
    }

    public onRowEdit(row: any) {
        console.log('onEdit() selected row:', row);
        this.summaryTitle = "Edit item";
        this.messageDetail = JSON.stringify(row.name);
        this.showGrowl('info');
    }

    public onRowDelete(row: any) {
        console.log('onDelete() selected row:', row);
        this.summaryTitle = "Delete item";
        this.messageDetail = JSON.stringify(row.name);
        this.showGrowl('danger');
    }

    showGrowl(type: string) {
        if (!type) {
            type = 'info';
        }
        this.asService.growl({
            severity: type,
            summary: this.summaryTitle,
            detail: this.messageDetail
        },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
        );
    }
}
