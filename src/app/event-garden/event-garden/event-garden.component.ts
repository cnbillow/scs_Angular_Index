import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

declare var $ , main_div_height, scs_alert, scs_loading, close_dialog, QRCode:any;


@Component({
  selector: 'app-event-garden',
  templateUrl: './event-garden.component.html',
  styleUrls: ['./event-garden.component.css']
})
export class EventGardenComponent implements OnInit {

  constructor(private apise: ApiService) { }

  state: string;
  user_id: string;
  event_id: string;

  ngOnInit() {
    this.get_event_state();
  }
  back_to_history() {
      window.history.back();
  }
  get_event_state(){
    scs_loading();
    this.apise.event_garden().subscribe(t => {
      close_dialog();
      this.state = t.message;
      this.user_id = t.user_id;
      this.event_id = t.event_id;
    },error => {
        close_dialog();
        if(error.error.message === "no"){
            this.state = "no"
        }
        else if(error.error.message === "use"){
            this.state = "use";
        }
        else{
          scs_alert(error.error.message);
        }
    });
  }
  get_q(){
    this.apise.event_garden_q().subscribe(t => {
      scs_alert("领取成功");
      this.state = "has";
      this.user_id = t.user_id;
      this.event_id = t.event_id;
    });
  }
  qrcode(){
    let that = this;
    let qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 100,
        height : 100
    });
    qrcode.makeCode("http://www.yuntunwj.com/#/admin-event-garden/" + this.event_id + "/user/" + this.user_id);
    setTimeout(() => {
        let base64 = $("#qrcode").find("img")[0].src;
        that.scs_alert("请到摊位领取","<img src="+ base64 +">");
    },0)
  }
  scs_alert(title,val){
      $.DialogByZ.Alert({Title: title, Content: val,BtnL:"确定",FunL:close_dialog()});
  }
}
