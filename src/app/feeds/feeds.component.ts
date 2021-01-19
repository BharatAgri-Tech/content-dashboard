import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NGXLogger} from 'ngx-logger';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {

  modalRef = {} as BsModalRef;
  imageFile = {} as any;
  englishImageFile = {} as any;
  hindiImageFile = {} as any;
  marathiImageFile = {} as any;
  selectedLanguages = new Set();
  scheduleTo: any;
  minDate = new Date();
  englishLanguageControl = new FormControl(false);
  hindiLanguageControl = new FormControl(false);
  marathiLanguageControl = new FormControl(false);
  imageSelectAllControl = new FormControl(true);
  youtubeSelectAllControl = new FormControl(true);
  userTypeControl = new FormControl('');
  notificationTypeControl = new FormControl('');
  cropControl = new FormControl('');
  stateControl =  new FormControl('');
  districtControl =  new FormControl('');
  talukaControl =  new FormControl('');
  englishTitle = '';
  hindiTitle = '';
  marathiTitle = '';
  englishMessage = '';
  hindiMessage = '';
  marathiMessage = '';
  youtubeLink = '';
  englishYoutubeLink = '';
  hindiYoutubeLink = '';
  marathiYoutubeLink = '';
  englishRedirectionLink = '';
  hindiRedirectionLink = '';
  marathiRedirectionLink = '';
  secondaryDeeplink = '';

  displayUserTypeError = false;
  displayNotificationTypeError = false;
  displayScheduleError = false;
  displayLanguageError = false;
  displayEnglishTitleError = false;
  displayHindiTitleError = false;
  displayMarathiTitleError = false;
  displayEnglishMessageError = false;
  displayHindiMessageError = false;
  displayMarathiMessageError = false;
  displayImageError = false;
  displayEnglishImageError = false;
  displayHindiImageError = false;
  displayMarathiImageError = false;
  displayYoutubeError = false;
  displayEnglishYoutubeError = false;
  displayHindiYoutubeError = false;
  displayMarathiYoutubeError = false;

  constructor(
    private modalService: BsModalService,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    console.log('in feeds page');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  validateFeeds() {
    this.modalRef.hide();
    const youtubeBase = 'https://www.youtube.com/watch?v=';
    this.displayUserTypeError = !this.userTypeControl.value;
    this.displayNotificationTypeError = !this.notificationTypeControl.value;
    this.displayScheduleError = !this.scheduleTo;
    this.displayLanguageError = this.selectedLanguages.size === 0;
    if (this.selectedLanguages.has('en')) {
      this.displayEnglishTitleError = this.englishTitle.length < 1;
      this.displayEnglishMessageError = this.englishMessage.length < 1;
      if (!this.imageSelectAllControl.value) {
        this.displayEnglishImageError = !this.englishImageFile;
      }
      if (!this.youtubeSelectAllControl.value) {
        // this.displayEnglishYoutubeError = this.englishYoutubeLink.
      }
    }

  }

  onImageSelect(event: any, language: string) {
    const currentImage = event.target.files;
    console.log(currentImage);
    this.imageFile = currentImage[0];
    console.log(this.imageFile);

  }

  onLanguageChange(currentLanguage: string) {
    if (this.selectedLanguages.has(currentLanguage)) {
      this.selectedLanguages.delete(currentLanguage);
    } else {
      this.selectedLanguages.add(currentLanguage);
    }
    this.imageSelectAllControl.setValue(true);
    this.youtubeSelectAllControl.setValue(true);
  }

}
