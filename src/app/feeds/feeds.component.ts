import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NGXLogger} from 'ngx-logger';
import {FormControl} from '@angular/forms';
import {LanguageEnums} from '../shared/enums/language-enums';

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

  onImageSelect(event: any, language: string) {
    const currentImage = event.target.files;
    switch (language) {
      case LanguageEnums.ENGLISH: {
        this.englishImageFile = currentImage[0];
        break;
      }
      case LanguageEnums.HINDI: {
        this.hindiImageFile = currentImage[0];
        break;
      }
      case LanguageEnums.MARATHI: {
        this.marathiImageFile = currentImage[0];
        break;
      }
      case LanguageEnums.ALL: {
        this.imageFile = currentImage[0];
        break;
      }
    }
    console.log('Selected image:', currentImage[0] );
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

  onTestUsersClick() {
    this.resetErrorMessages();
    this.validateFeeds();
  }

  onSendUsersClick() {
    this.modalRef.hide();
    this.resetErrorMessages();
    this.validateFeeds();
  }

  resetErrorMessages() {
    this.displayUserTypeError = false;
    this.displayNotificationTypeError = false;
    this.displayScheduleError = false;
    this.displayLanguageError = false;
    this.displayEnglishTitleError = false;
    this.displayHindiTitleError = false;
    this.displayMarathiTitleError = false;
    this.displayEnglishMessageError = false;
    this.displayHindiMessageError = false;
    this.displayMarathiMessageError = false;
    this.displayImageError = false;
    this.displayEnglishImageError = false;
    this.displayHindiImageError = false;
    this.displayMarathiImageError = false;
    this.displayYoutubeError = false;
    this.displayEnglishYoutubeError = false;
    this.displayHindiYoutubeError = false;
    this.displayMarathiYoutubeError = false;
  }

  validateFeeds() {
    const youtubeBase = 'https://www.youtube.com/watch?v=';
    this.displayUserTypeError = !this.userTypeControl.value;
    this.displayNotificationTypeError = !this.notificationTypeControl.value;
    this.displayScheduleError = !this.scheduleTo;
    this.displayLanguageError = this.selectedLanguages.size === 0;
    // English language validation
    if (this.selectedLanguages.has('en')) {
      this.displayEnglishTitleError = this.englishTitle.length < 1;
      this.displayEnglishMessageError = this.englishMessage.length < 1;
      if (this.imageSelectAllControl.value) {
        this.displayEnglishImageError = this.englishImageFile?.name === undefined;
      } else {
        this.displayImageError = this.imageFile?.name === undefined;
      }
      if (this.youtubeSelectAllControl.value && this.englishYoutubeLink.length > 0) {
        this.displayEnglishYoutubeError = !this.englishYoutubeLink.includes(youtubeBase);
      } else if (this.youtubeLink.length > 0) {
        this.displayYoutubeError = !this.youtubeLink.includes(youtubeBase);
      }
    }
    // Hindi language validation
    if (this.selectedLanguages.has('hi')) {
      this.displayHindiTitleError = this.hindiTitle.length < 1;
      this.displayHindiMessageError = this.hindiMessage.length < 1;
      if (this.imageSelectAllControl.value) {
        this.displayHindiImageError = this.hindiImageFile?.name === undefined;
      } else {
        this.displayImageError = this.imageFile?.name === undefined;
      }
      if (this.youtubeSelectAllControl.value && this.hindiYoutubeLink.length > 0) {
        this.displayHindiYoutubeError = !this.hindiYoutubeLink.includes(youtubeBase);
      } else if (this.youtubeLink.length > 0) {
        this.displayYoutubeError = !this.youtubeLink.includes(youtubeBase);
      }
    }
    // Marathi language validation
    if (this.selectedLanguages.has('mr')) {
      this.displayMarathiTitleError = this.marathiTitle.length < 1;
      this.displayMarathiMessageError = this.marathiMessage.length < 1;
      if (this.imageSelectAllControl.value) {
        this.displayMarathiImageError = this.marathiImageFile?.name === undefined;
      } else {
        this.displayImageError = this.imageFile?.name === undefined;
      }
      if (this.youtubeSelectAllControl.value && this.marathiYoutubeLink.length > 0) {
        this.displayMarathiYoutubeError = !this.marathiYoutubeLink.includes(youtubeBase);
      } else if (this.youtubeLink.length > 0) {
        this.displayYoutubeError = !this.youtubeLink.includes(youtubeBase);
      }
    }

  }

}
