import { Component } from '@angular/core';
import { NgTinyUrlService } from 'ng-tiny-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'UrlShorter';

  model = {
    inputUrl: '',
  };
  isFormSubmitted = false;
  isLoading = false;
  shortUrl = '';
  isTextCopied = false;

  constructor(private tinyUrl: NgTinyUrlService) {}

  onSubmitUrlForm(urlForm: any) {
    if (urlForm.valid) {
      this.isLoading = true;
      this.tinyUrl.shorten(this.model.inputUrl).subscribe(
        (data) => {
          this.shortUrl = data;
          this.isFormSubmitted = true;
          this.isLoading = false;
        },
        (error) => {
          alert('Something went wrong , Please check your URL and try again');
          this.isLoading = false;
        }
      );
    }
  }

  // reset
  reset() {
    this.model.inputUrl = '';
    this.isFormSubmitted = false;
    this.isTextCopied = false;
  }

  // Copy

  copyUrl(shortUrlElementRef:any){
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type','text');
    inputElement.setAttribute('value', shortUrlElementRef.innerHTML);
    inputElement.select();
    inputElement.setSelectionRange(0,999999);  // for mobile seelction

    try{
      navigator.clipboard.writeText(inputElement.value);
      this.isTextCopied = true;
      setTimeout(()=> {
        this.isTextCopied = false;
      },2000);
    } catch(e:any){
      console.warn('Error while copying....',e.toString())
    }

  }
}
