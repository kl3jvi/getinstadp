import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  ae: any[]
  foto;
  fullname;
  bio;
  followers;
  following;
  posts;
  
  constructor(private title: Title,private router: Router,private meta: Meta, public http: HttpClient) { }

  ionViewDidEnter() {
    this.foto = "https://cdn.dribbble.com/users/198186/screenshots/2225719/0903.gif";
  }

  setMetaTags(config?: any) {
    config = {
      title: `GetInstaDP`,
      description: `See anyone's profile picture for free in full size.Also get full size profile pictures of private instagram users.`,
      image: `https://image.flaticon.com/icons/svg/465/465608.svg`,
      url: `https://www.getinstadp.com/${this.router.url}`,
    };
    this.title.setTitle(config.title);
    //Google//
    this.meta.updateTag({ name: 'Description', content: config.description });

    //twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: `@kl3jvi1` });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

  }

  getPhoto(a) {
    return this.http.get("https://www.instagram.com/" + a + "/?__a=1").subscribe(data => {
      console.log(data)
      this.foto = data["graphql"]["user"]["profile_pic_url_hd"];
      this.fullname = data["graphql"]["user"]["full_name"];
      this.bio = data["graphql"]["user"]["biography"];
      this.following = data["graphql"]["user"]["edge_follow"]["count"];
      this.followers = data["graphql"]["user"]["edge_followed_by"]["count"];
    })
  }

}
