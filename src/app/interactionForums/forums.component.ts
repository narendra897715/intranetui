import { Component, OnInit, Inject } from '@angular/core';
import { RequestOptions } from '@angular/http/src';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessLogicService } from '../business-logic.service';

@Component({
    selector: 'app-forums',
    templateUrl: './forums.component.html',
    styleUrls: ['./forums.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: { 'class': 'section main hbox space-between' }
})
export class ForumsComponent implements OnInit {
    examService: any;
    http: any;
    apiEndPoint: any;
    catergoryname: string;
    category_url: string;
    public activeUrl: string;
    forumsSubMenu: any;


    // tslint:disable-next-line:max-line-length
    // forumsSubMenu = [{ 'categoryURL': 'newlyadded', 'categoryName': 'Newly Added', 'serviceURL': 'interaction_forums/getInteractionForumsNewlyAddedDetails' }, { 'categoryURL': 'trending', 'categoryName': 'Trending', 'serviceURL': 'interaction_forums/getInteractionForumsTrendingDetails' }, { 'categoryURL': 'mostcommented', 'categoryName': 'Most Commented', 'serviceURL': 'interaction_forums/getInteractionForumsMostCommentedDetails'},{ 'categoryURL': 'classified', 'categoryName': 'Classified', 'serviceURL': 'interaction_forums/getInteractionForumsNewlyAddedDetails' },{ 'categoryURL': 'lost&found', 'categoryName': 'Lost&Found', 'serviceURL': 'interaction_forums/getInteractionForumsNewlyAddedDetails' },{ 'categoryURL': 'polling', 'categoryName': 'Polling', 'serviceURL': 'interaction_forums/getInteractionForumsNewlyAddedDetails' }];
    table = [
        { no_posts: '1247 Posts', name: 'Business Related', Last_updated: '7 hours ago' },
        { no_posts: '134 Posts', name: 'HR Related', Last_updated: '1 hour ago' },
        { no_posts: '1247 Posts', name: 'Tech Related', Last_updated: '1 hour ago' }
    ];
    cardTopics = [{
        'stream': 'business related', 'numberOfQuestions': '1204 Posts', 'time': '7 hours ago', 'backgroundColor': '#f59b66',
        visible: 'true'
    },
    {
        'stream': 'technology related', 'numberOfQuestions': '1000 Posts', 'time': '2 hours ago', 'backgroundColor': '#9464d1',
        visible: 'true'
    },
    {
        'stream': 'HR related', 'numberOfQuestions': '120 Posts', 'time': '1 month ago', 'backgroundColor': '#73b9f4',
        visible: 'true'
    },
    {
        'stream': 'Cloud related', 'numberOfQuestions': '120 Posts', 'time': '1 month ago', 'backgroundColor': '#f59b66',
        visible: 'true'
    },
    {
        'stream': 'Culture and development related', 'numberOfQuestions': '120 Posts', 'time': '1 month ago', 'backgroundColor': '#9464d1',
        visible: 'true'
    },
    {
        'stream': 'PE related', 'numberOfQuestions': '120 Posts', 'time': '1 month ago', 'backgroundColor': '#73b9f4',
        visible: 'true'
    },
    {
        'stream': 'Others', 'numberOfQuestions': '120 Posts', 'time': '1 month ago', 'backgroundColor': '#f59b66',
        visible: 'true'
    }
    ];
    uploadFile(event: any) {
        // tslint:disable-next-line:prefer-const
        let file = event.target.files[0];
        // tslint:disable-next-line:prefer-const
        let fileName = file.name;
        console.log(file);
        console.log(fileName);
        // tslint:disable-next-line:prefer-const
        let formData = new FormData();
        formData.append('file', file);
        this.examService.uploadAnswer(formData);
    }
    constructor(private businesslogic: BusinessLogicService, private route: ActivatedRoute, private router: Router) {
        this.businesslogic.getMessage().subscribe(message => {
            this.getInteractionForumsCategoryDropdown();
          });
     }
    ngOnInit() {
        // this.redirect('trending');
        if (this.businesslogic.employeeId == null) {
            // tslint:disable-next-line:max-line-length
            this.businesslogic.get('employee/getEmployeeDetailsWithToken').subscribe((response: any) => {
                this.getInteractionForumsCategoryDropdown();
            });
          } else {
            this.getInteractionForumsCategoryDropdown();
          }
    }
    getInteractionForumsCategoryDropdown() {

        this.businesslogic.get('interaction_forums/getSubMenu').subscribe((response: any) => {
            this.forumsSubMenu = response;

          });
    }
    redirect(url) { 

        this.activeUrl = url;

        // this.router.navigate(['recentlyposted'], { relativeTo: this.route });
         // this.businesslogic.receiveeventname(serviceURL);
        this.router.navigate([url], { relativeTo: this.route });
        // this.catergoryname = categoryname;
        // this.router.navigate(['intranet/forums/subcategoryforum'], { relativeTo: this.route });
    }


}

