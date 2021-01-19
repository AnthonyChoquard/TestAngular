import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {
  showModal: boolean;
  mail: string;
  pass: string;
  termsOfUse: boolean;
  allTermHasBeenRead: boolean;
  constructor(private cdf: ChangeDetectorRef) { 
    this.showModal = false;
    this.mail = "";
    this.pass = "";
    this.termsOfUse = false;
    this.allTermHasBeenRead = false;
  }

  open(){
    this.showModal = true;
    this.cdf.detectChanges();
    console.log(document.getElementsByName("conditions")[0])
    document.getElementsByName("conditions")[0].addEventListener("scroll", this.checkScrollHeight, false);
    document.getElementsByName("mark")[0].addEventListener("change",this.checkAcceptationTermOfUse, false);
  }
  close(){
    this.showModal = false;
  }
  validateTermsOfUse(){
    this.termsOfUse = true;
    this.close();
  }
  checkFormFilled(){
    return !(this.mail && this.pass && this.termsOfUse)
  }
  checkScrollHeight(){
    var textAreaTermsOfUses = document.getElementsByName("conditions")[0] 
    var checkboxTermsOfUses = document.getElementsByName("mark")[0] as HTMLInputElement;
    var warningMustReadTerms = document.getElementsByName("warningTerms")[0]
    if ((textAreaTermsOfUses.scrollTop + textAreaTermsOfUses.offsetHeight) >= textAreaTermsOfUses.scrollHeight){
      checkboxTermsOfUses.removeAttribute("disabled")
      warningMustReadTerms.textContent = "";
    }
  }
  checkAcceptationTermOfUse(){
    var checkboxTermsOfUses = document.getElementsByName("mark")[0] as HTMLInputElement;
    if(checkboxTermsOfUses.checked){
      document.getElementsByName("accept")[0].removeAttribute("disabled")
    }
  }
  sendForm(){
    $.ajax({
      url : "https://www.example.com/FormTestAngular",
      type : 'POST',
      data : 'mail=' + this.mail + "/password=" + this.pass,
      dataType : 'html',
      success : function(data,status){
        console.log('Requète envoyée avec succès !')
      },
      error : function(res, status, err){
        console.log("La requète n'as pas pu être envoyée.")
      }

    });
  }
  ngOnInit(): void {

  }


}
