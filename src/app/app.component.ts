import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

error:string="";
  hasError:boolean=false;
  col:number=7;
  row:number=0;
  totalSeat:number=80;
  seatView:any;
  trainUser={
    "user":'default',
    "seat":'7'
  }
  users:any=[
    {"id":"user1",name:"User1"}
  ];


  constructor() { 
    let data=localStorage.getItem("data");
    if(data==undefined || data==null){
      let output:any=[];
      this.row=Math.ceil(this.totalSeat/this.col);
      
      for(var i=1;i<=this.row;i++){
        if(i==this.row){
          // console.log("==");
          if((this.row*this.col)>this.totalSeat){
            // console.log(">");
            let isMore=((this.row*this.col)-this.totalSeat);
            let lastColRem=(this.col-isMore);
            var cols=this.getCol(lastColRem);
            this.col=lastColRem;
          }
        }else{
          var cols=this.getCol(this.col);
        }
        output.push({active:0,deactive:0,total:this.col,user:"default",cols:cols});
      }
      this.set("data",output);
    }
    
  }

  private getCol(colData:number){
    let col:any=[];
    var init=1;
    let getInfo=this.get("arr_info");
    var colData=colData;
    if(getInfo!=null || getInfo!=undefined ){
      init=getInfo.last;
      colData=(getInfo.increment+colData);
    }
    while(init<=colData){
      col.push(init);
      init++;
    }
    let lastEl=col[col.length-1];
    this.set("arr_info",{"last":(lastEl+1),"increment":colData});
    return col;
  }


  ngOnInit(): void {
    let data=this.get("data");
    if(data!=null){
      this.seatView=data;
    }else{
      console.log("storage data come null");
    }
  }

  reserveSeat(){
    let seat=parseInt(this.trainUser.seat);
    
    // console.log(this.trainUser.user);
    if(seat>7){
      this.error="One use can resever 7 seat only";
      this.hasError=true;
    }else{

      if(this.trainUser.user=="default"){
        this.error="Please choose user";
        this.hasError=true;
      }
      else{

        let rowStatus:any=[];
        var msgNotShow=false;

        this.seatView.every((element:any,index:number) => {
          if((element.active==0 || seat<=element.deactive) && (element.total>=seat) ){
            // console.log(element.deactive);
            // console.log(index);
            console.log(seat+"--------------------");
            this.seatView[index].active=element.active+seat;
            this.seatView[index].deactive=(element.total)-this.seatView[index].active;
            this.seatView[index].user=this.trainUser.user;
            this.set("data",this.seatView);
            msgNotShow=true;
            this.error="";
            this.hasError=false;
            return false;
          }

          rowStatus.push(element.total==element.active);
          return true;
        });
        
        console.log("outer loop"+rowStatus);
        // let min=Math.min(...remainRow);
        // if(min==7 && remainRow.length>0){
        //   alert("All seat booked");
        // }
        // else{
        //   let max=Math.max(...remainRow);
        //   console.log(msgNotShow);
        console.log(rowStatus.indexOf(false));
          if(rowStatus.indexOf(false)==-1 && msgNotShow==false){
            this.error="All seat reserved";
            this.hasError=true;
          }
          if(rowStatus.indexOf(false)>-1 && msgNotShow==false){
            let row=this.seatView[rowStatus.indexOf(false)];
            this.error="Max "+row.deactive+" seat can booked in row "+(rowStatus.indexOf(false)+1);
            this.hasError=true;
          }
        // }

      }
      
    }
  }
  
  // unset(){
  //   this.trainUser.user="default";
  //   this.trainUser.seat="";
  // }

  // getReservedSeat(user:any){
  //   let user_id=user.value;
  //   let rseat=this.get(user_id);
  // }

  private get(token:any){
    let store=localStorage.getItem(token);
    if(store!=null){
      return JSON.parse(store);
    }
  }

  private set(token:string,data:any){
    localStorage.setItem(token,JSON.stringify(data));
  }


  
  // private chunk(array:any, size:number) {
  //   const chunked_arr = [];
  //   for (let i = 0; i < array.length; i++) {
  //     const last = chunked_arr[chunked_arr.length - 1];
  //     if (!last || last.length === size) {
  //       chunked_arr.push([array[i]]);
  //     } else {
  //       last.push(array[i]);
  //     }
  //   }
  //   return chunked_arr;
  // }

  
}
