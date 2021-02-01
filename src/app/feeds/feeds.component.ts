import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NGXLogger} from 'ngx-logger';
import {FormControl} from '@angular/forms';
import {ImageValidator, ImageValidatorType, LanguageEnums} from '../shared/enums/language-enums';
import {FeedService} from '../services/feed.service';
import {Crop, District, State, Taluka} from '../shared/models/common-models';
import {Feed, FeedImage, NotificationType} from './feed-models';
import {DatePipe} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {

  // disable fields
  disableCrop = true;
  disableState = true;

  modalRef = {} as BsModalRef;
  states = [] as State[];
  districts = [] as District[];
  talukas = [] as Taluka[];
  notifications = [] as NotificationType[];
  crops = [] as Crop[];
  feed = {} as Feed;
  isLoadingDistrict = false;
  isLoadingTaluka = false;
  imageValidatorTypes = Object.values(ImageValidatorType);
  imageValidatorSize = ImageValidator;


  imageFile = {} as any;
  englishImageFile = {} as any;
  hindiImageFile = {} as any;
  marathiImageFile = {} as any;
  imageSource = '';
  englishImageSource = '';
  hindiImageSource = '';
  marathiImageSource = '';
  selectedLanguages = new Set();
  scheduleTo = '';
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

  imageId = '';
  englishImageId = '';
  hindiImageId = '';
  marathiImageId = '';

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
  displayImageTypeError = false;
  displayEnglishImageTypeError = false;
  displayMarathiImageTypeError = false;
  displayHindiImageTypeError = false;
  displayImageSizeError = false;
  displayEnglishSizeTypeError = false;
  displayMarathiSizeTypeError = false;
  displayHindiSizeTypeError = false;

  displayFeedSaved = false;
  displayFeedSaveFailed = false;
  displaySendingFeed = false;

  constructor(
    private modalService: BsModalService,
    private logger: NGXLogger,
    private feedService: FeedService,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getNotificationTypes();
    this.getStates();
    this.getCropList();
  }

  getNotificationTypes() {
    this.feedService.getNotificationTypes().subscribe(
      data => {
        this.notifications = data;
        this.notifications = this.notifications.filter( notification => notification.lang === 'en');
      }, error => {
        this.logger.error('Unable to fetch notification types', error);
      }
    );
  }

  getCropList() {
    this.feedService.getCropList().subscribe(
      data => {
        this.crops = data.data;
      }, error => {
        this.logger.error('Unable to fetch crop list', error);
      }
    );
  }

  getStates() {
    this.feedService.getStates().subscribe(
      data => {
        this.states = data;
      }, error => {
        this.logger.error('Unable to fetch states', error);
      }
    );
  }

  getDistricts() {
    this.isLoadingDistrict = true;
    this.districts = [];
    this.talukas = [];
    this.districtControl.setValue('');
    this.talukaControl.setValue('');
    if (this.stateControl.value) {
      this.feedService.getDistricts(this.stateControl.value).subscribe(
        data => {
          this.districts = data;
          this.isLoadingDistrict = false;
        }, error => {
          this.isLoadingDistrict = false;
          this.logger.error('Unable to fetch districts', error);
        }
      );
    } else {
      this.isLoadingDistrict = false;
    }
  }

  getTalukas() {
    this.isLoadingTaluka = true;
    this.talukas = [];
    this.talukaControl.setValue('');
    if (this.districtControl.value) {
      this.feedService.getTalukas(this.districtControl.value).subscribe(
        data => {
          this.talukas = data;
          this.isLoadingTaluka = false;
        }, error => {
          this.isLoadingTaluka = false;
          this.logger.error('Unable to fetch talukas', error);
        }
      );
    } else {
      this.isLoadingTaluka = false;
    }
  }

  setCurrentDateAndTime() {
    this.scheduleTo = '';
    this.minDate = new Date();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  resetImageFiles() {
    this.imageFile = {} as any;
    this.englishImageFile = {} as any;
    this.hindiImageFile = {} as any;
    this.marathiImageFile = {} as any;
    this.imageSource = '';
    this.englishImageSource = '';
    this.hindiImageSource = '';
    this.marathiImageSource = '';
  }

  onImageSelect(event: any, language: string) {
    const currentImage = event.target.files;
    switch (language) {
      case LanguageEnums.ENGLISH: {
        this.englishImageFile = currentImage[0];
        this.englishImageSource = window.URL.createObjectURL(this.englishImageFile);
        break;
      }
      case LanguageEnums.HINDI: {
        this.hindiImageFile = currentImage[0];
        this.hindiImageSource = window.URL.createObjectURL(this.hindiImageFile);
        break;
      }
      case LanguageEnums.MARATHI: {
        this.marathiImageFile = currentImage[0];
        this.marathiImageSource = window.URL.createObjectURL(this.marathiImageFile);
        break;
      }
      case LanguageEnums.ALL: {
        this.imageFile = currentImage[0];
        this.imageSource = window.URL.createObjectURL(this.imageFile);
        break;
      }
    }
  }

  onLanguageChange(currentLanguage: string) {
    if (this.selectedLanguages.has(currentLanguage)) {
      this.selectedLanguages.delete(currentLanguage);
      this.englishImageFile = currentLanguage === LanguageEnums.ENGLISH ? {} as any : this.englishImageFile;
      this.hindiImageFile = currentLanguage === LanguageEnums.HINDI ? {} as any : this.hindiImageFile;
      this.marathiImageFile = currentLanguage === LanguageEnums.MARATHI ? {} as any : this.marathiImageFile;
    } else {
      this.selectedLanguages.add(currentLanguage);
    }
    this.imageSelectAllControl.setValue(true);
    this.youtubeSelectAllControl.setValue(true);
  }

  onTestUsersClick() {
    console.log(this.englishImageFile);
    this.displaySendingFeed = true;
    this.feed.is_test_feed = true;
    this.saveImageAndCreateFeed();
  }

  onSendUsersClick() {
    this.modalRef.hide();
    this.displaySendingFeed = true;
    this.feed.is_test_feed = false;
    this.saveImageAndCreateFeed();
  }

  saveImageAndCreateFeed() {
    this.resetErrorMessages();
    const validatedFeed = this.validateFeeds();
    if (!validatedFeed) {
      this.saveImages();
    } else {
      this.displaySendingFeed = false;
    }
  }

  saveImages() {
    if (this.imageSelectAllControl.value) {
        this.feedService.saveImage(null, this.englishImageFile, this.hindiImageFile, this.marathiImageFile).subscribe(
          data => {
            if (this.englishImageFile?.name !== undefined &&
              this.hindiImageFile?.name !== undefined && this.marathiImageFile?.name !== undefined) {
              this.englishImageId = data[0].id;
              this.hindiImageId = data[1].id;
              this.marathiImageId = data[2].id;
            } else if (this.englishImageFile?.name !== undefined &&
              this.hindiImageFile?.name !== undefined && this.marathiImageFile?.name === undefined) {
              this.englishImageId = data[0].id;
              this.hindiImageId = data[1].id;
            } else if (this.englishImageFile?.name !== undefined &&
              this.hindiImageFile?.name === undefined && this.marathiImageFile?.name !== undefined) {
              this.englishImageId = data[0].id;
              this.marathiImageId = data[1].id;
            } else if (this.englishImageFile?.name === undefined &&
              this.hindiImageFile?.name !== undefined && this.marathiImageFile?.name !== undefined) {
              this.hindiImageId = data[0].id;
              this.marathiImageId = data[1].id;
            } else if (this.englishImageFile?.name !== undefined &&
              this.hindiImageFile?.name === undefined && this.marathiImageFile?.name === undefined) {
              this.englishImageId = data[0].id;
            } else if (this.englishImageFile?.name === undefined &&
              this.hindiImageFile?.name !== undefined && this.marathiImageFile?.name === undefined) {
              this.hindiImageId = data[0].id;
            } else {
              this.marathiImageId = data[0].id;
            }
          }, error => {
            this.logger.error('Image upload error', error);
            this.displaySendingFeed = false;
          }, () => {
            this.createFeed();
          }
        );
    } else {
      this.feedService.saveImage(this.imageFile, null, null, null).subscribe(
        data => {
          this.imageId = data[0].id;
          this.englishImageId = this.imageId;
          this.hindiImageId = this.imageId;
          this.marathiImageId = this.imageId;
        }, error => {
          this.logger.error('Image upload error', error);
          this.displaySendingFeed = false;
        }, () => {
          this.createFeed();
        }
      );
    }
  }

  createFeed() {
    if (!this.selectedLanguages.has('en')) {
      this.englishImageFile = {} as any;
      this.englishImageId = '';
      this.englishYoutubeLink = '';
      this.englishMessage = '';
      this.englishTitle = '';
      this.englishRedirectionLink = '';
    }
    if (!this.selectedLanguages.has('hi')) {
      this.hindiImageFile = {} as any;
      this.hindiImageId = '';
      this.hindiYoutubeLink = '';
      this.hindiMessage = '';
      this.hindiTitle = '';
      this.hindiRedirectionLink = '';
    }
    if (!this.selectedLanguages.has('mr')) {
      this.marathiImageFile = {} as any;
      this.marathiImageId = '';
      this.marathiYoutubeLink = '';
      this.marathiMessage = '';
      this.marathiTitle = '';
      this.marathiRedirectionLink = '';
    }
    // Default values
    this.feed.org_ids = [67];
    this.feed.lang = 'en';
    this.feed.delivery_type = 'feed';
    this.feed.should_schedule = true;

    // Generated values
    this.feed.notification_type = this.notificationTypeControl.value;
    this.feed.users_type = this.userTypeControl.value;
    this.feed.news_lang = Object.values(Array.from(this.selectedLanguages)) as string[];
    this.feed.preferred_lang = Object.values(Array.from(this.selectedLanguages)) as string[];
    this.feed.youtube_video_link_en = this.selectedLanguages.has('en') ?
      this.youtubeSelectAllControl ? this.englishYoutubeLink : this.youtubeLink : '';
    this.feed.youtube_video_link_hi = this.selectedLanguages.has('hi') ?
      this.youtubeSelectAllControl ? this.hindiYoutubeLink : this.youtubeLink : '';
    this.feed.youtube_video_link_mr = this.selectedLanguages.has('mr') ?
      this.youtubeSelectAllControl ? this.marathiYoutubeLink : this.youtubeLink : '';
    this.feed.secondary_redirection_hint_en = this.englishRedirectionLink;
    this.feed.secondary_redirection_hint_hi = this.hindiRedirectionLink;
    this.feed.secondary_redirection_hint_mr = this.marathiRedirectionLink;
    this.feed.secondary_redirection_deeplink = this.secondaryDeeplink;
    this.feed.title_en = this.englishTitle;
    this.feed.title_hi = this.hindiTitle;
    this.feed.title_mr = this.marathiTitle;
    this.feed.image_id_en = Number(this.englishImageId);
    this.feed.image_id_hi = Number(this.hindiImageId);
    this.feed.image_id_mr = Number(this.marathiImageId);
    this.feed.message_en = this.englishMessage;
    this.feed.message_hi = this.hindiMessage;
    this.feed.message_mr = this.marathiMessage;
    this.feed.crops = this.cropControl.value ?  [this.cropControl.value] : [];
    this.feed.state =  this.stateControl.value ?  [this.stateControl.value] : [];
    this.feed.district =  this.districtControl.value ?  [this.districtControl.value] : [];
    this.feed.taluka =  this.talukaControl.value ?  [this.talukaControl.value] : [];

    // Formatting date as required
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.scheduleTo, 'yy/MM/dd HH:mm:ss');
    this.feed.schedule_to = formattedDate ? formattedDate.toString() : '';

    this.feedService.saveFeed(this.feed).subscribe(
      result => {
        this.logger.info('Saved feeds successfully');
        this.displaySendingFeed = false;
        this.displayFeedSaved = true;
        this.resetFeedForm();
      }, error => {
        this.logger.error('Unable to save feeds', error);
        this.displaySendingFeed = false;
        this.displayFeedSaveFailed = true;
        setTimeout (() => {
          this.displayFeedSaveFailed = false;
        }, 2000);
      }
    );
  }

  resetFeedForm() {
    if (this.feed.is_test_feed) {
      this.scheduleTo = '';
      this.minDate = new Date();
      setTimeout (() => {
        this.displayFeedSaved = false;
      }, 2000);
    } else {
      this.feed = {} as Feed;
      this.imageFile = {} as any;
      this.englishImageFile = {} as any;
      this.hindiImageFile = {} as any;
      this.marathiImageFile = {} as any;
      this.selectedLanguages = new Set();
      this.scheduleTo = '';
      this.minDate = new Date();
      this.englishLanguageControl.setValue(false);
      this.hindiLanguageControl.setValue(false);
      this.marathiLanguageControl.setValue(false);
      this.imageSelectAllControl.setValue(true);
      this.youtubeSelectAllControl.setValue(true);
      this.userTypeControl.setValue('');
      this.notificationTypeControl.setValue('');
      this.cropControl.setValue('');
      this.stateControl.setValue('');
      this.districtControl.setValue('');
      this.talukaControl.setValue('');
      this.englishTitle = '';
      this.hindiTitle = '';
      this.marathiTitle = '';
      this.englishMessage = '';
      this.hindiMessage = '';
      this.marathiMessage = '';
      this.youtubeLink = '';
      this.englishYoutubeLink = '';
      this.hindiYoutubeLink = '';
      this.marathiYoutubeLink = '';
      this.englishRedirectionLink = '';
      this.hindiRedirectionLink = '';
      this.marathiRedirectionLink = '';
      this.secondaryDeeplink = '';
      this.imageId = '';
      this.englishImageId = '';
      this.hindiImageId = '';
      this.marathiImageId = '';
    }
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
    this.displayImageTypeError = false;
    this.displayEnglishImageTypeError = false;
    this.displayMarathiImageTypeError = false;
    this.displayHindiImageTypeError = false;
    this.displayImageSizeError = false;
    this.displayEnglishSizeTypeError = false;
    this.displayMarathiSizeTypeError = false;
    this.displayHindiSizeTypeError = false;
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
        if (this.englishImageFile?.name !== undefined) {
          let name = this.englishImageFile.name;
          name = name.split('.').pop();
          this.displayEnglishSizeTypeError = this.englishImageFile.size > ImageValidator.SIZE;
          this.displayEnglishImageTypeError = !this.imageValidatorTypes.includes(name);
        }
      } else {
        this.validateCommonImage();
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
        if (this.hindiImageFile?.name !== undefined) {
          let name = this.hindiImageFile.name;
          name = name.split('.').pop();
          this.displayHindiSizeTypeError = this.hindiImageFile.size > ImageValidator.SIZE;
          this.displayHindiImageTypeError = !this.imageValidatorTypes.includes(name);
        }
      } else {
        this.validateCommonImage();
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
        if (this.marathiImageFile?.name !== undefined) {
          let name = this.marathiImageFile.name;
          name = name.split('.').pop();
          this.displayMarathiSizeTypeError = this.marathiImageFile.size > ImageValidator.SIZE;
          this.displayMarathiImageTypeError = !this.imageValidatorTypes.includes(name);
        }
      } else {
        this.validateCommonImage();
      }
      if (this.youtubeSelectAllControl.value && this.marathiYoutubeLink.length > 0) {
        this.displayMarathiYoutubeError = !this.marathiYoutubeLink.includes(youtubeBase);
      } else if (this.youtubeLink.length > 0) {
        this.displayYoutubeError = !this.youtubeLink.includes(youtubeBase);
      }
    }
    return ( this.displayUserTypeError || this.displayNotificationTypeError || this.displayScheduleError ||
      this.displayLanguageError || this.displayEnglishTitleError || this.displayHindiTitleError ||
      this.displayMarathiTitleError || this.displayEnglishMessageError || this.displayHindiMessageError ||
      this.displayMarathiMessageError || this.displayImageError || this.displayEnglishImageError ||
      this.displayHindiImageError || this.displayMarathiImageError || this.displayYoutubeError ||
      this.displayEnglishYoutubeError || this.displayHindiYoutubeError || this.displayMarathiYoutubeError ||
      this.displayImageSizeError || this.displayImageTypeError || this.displayEnglishImageTypeError ||
      this.displayEnglishSizeTypeError || this.displayHindiImageTypeError || this.displayHindiSizeTypeError ||
      this.displayMarathiImageTypeError || this.displayMarathiSizeTypeError);
  }

  validateCommonImage() {
    this.displayImageError = this.imageFile?.name === undefined;
    if (this.imageFile?.name !== undefined) {
      let name = this.imageFile.name;
      name = name.split('.').pop();
      this.displayImageSizeError = this.imageFile.size > ImageValidator.SIZE;
      this.displayImageTypeError = !this.imageValidatorTypes.includes(name);
    }
  }

}
