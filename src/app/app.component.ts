import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
error:string="";
  hasError:boolean=false;
  seatOutput:any;
  totalSeat:any=[];
  totalReservedSeat:any=0;
  trainUser={
    "user":'default',
    "seat":'7'
  }
  users:any=[
    {"id":"user1",name:"User1"},
    {"id":"user2",name:"User2"}
  ];


  constructor() { 
    for(var i=1;i<=80;i++){
      this.totalSeat.push(i);
    }
    this.seatOutput=this.chunk(this.totalSeat,7);
  }

  ngOnInit(): void {
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
        let rseat=this.get(this.trainUser.user);
        console.log("here"+rseat);
        if(rseat!=null || rseat!=undefined){
          let finalSeat=parseInt(rseat)+seat;
          if(finalSeat<81){
            this.set(finalSeat,this.trainUser.user);
            console.log("final"+rseat);
            this.unset();
          }else{
            this.error="Available seat is only "+(80-parseInt(rseat));
            this.hasError=true;
            
          }
        }else{
          this.set(seat,this.trainUser.user);
          this.unset();
        }    
        
      }
      
    }
  }
  
  unset(){
    this.trainUser.user="default";
    this.trainUser.seat="";
  }

  getReservedSeat(user:any){
    let user_id=user.value;
    let rseat=this.get(user_id);
    this.totalReservedSeat=rseat;

  }

  get(token:any){
    return localStorage.getItem(token);
  }

  set(data:any,token:string){
    localStorage.setItem(token,data);
  }


  
  private chunk(array:any, size:number) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
  }


  
}
