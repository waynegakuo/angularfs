import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../services/item.service';
import {Item} from '../../models/item'; //we need to import our interface from model


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[]; //coming from our interface
  editState: boolean=false;
  itemToEdit: Item;


  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(subItems => {
      //console.log(subItems);
      this.items=subItems; //getting items through Observable and setting them to items
    })
  }
  deleteItem(event, item: Item){
    this.clearState();
    this.itemService.deleteItem(item);
  }
  editItem(event, item: Item){
    this.editState=true;
    this.itemToEdit=item;
  }
  updateItem(item: Item){
    this.itemService.updateItem(item);
    this.clearState();
  }
  clearState(){
    this.editState=false;
    this.itemToEdit=null;
  }
}
