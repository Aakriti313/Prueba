import { Component, ElementRef} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '../clases/users';
import { PostService } from '../services/post.service';
import { IsLogued } from '../services/logued.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})

export class FormsComponent {
  
  isLogInFormVisible = true;
  isSignUpFormVisible = false;
  
  isLogued :any;
  
  //Mostrar SignUpForm
  showSignUpForm() {
    this.isLogInFormVisible = false;
    this.isSignUpFormVisible = true;
  }

  //Formularios
  constructor(private fb: FormBuilder, private postService: PostService, private el:ElementRef, private logued : IsLogued) {}

  logInForm = this.fb.group({
    nickname_user: ['', Validators.required],
    password_user: ['', Validators.required],
  });

  signUpForm = this.fb.group({
      name_user: ['', Validators.required],
      surname_user: ['', Validators.required],
      nickname_user: ['', Validators.required],
      age_user: ['', Validators.required],
      email_user: ['', [Validators.required, Validators.min(0), Validators.email]],
      phone_user: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password_user: ['', Validators.required],
      repeat_password_user: ['', Validators.required],
    });

  //LogIn
  onSubmitLogIn(){
    if (this.logInForm.valid) {
      let nickname = this.logInForm.value.nickname_user as string;
      let password = this.logInForm.value.password_user as string;
      
      this.isLogued = this.logued.setIsLogued(true);
      let user: User = {
        nickname_user: nickname,
        password: password
      };

      this.postService.postUserLogIn(user).subscribe((result) => {
        console.log(result)
        if (result["message"] == "Inicio de sesión exitoso") {
          
          this.isLogInFormVisible = false;
          this.isSignUpFormVisible = false;
          alert(result["message"]);
          console.log(this.logInForm.value);
          localStorage.setItem('currentUser',JSON.stringify(result["user"]));
          localStorage.setItem('nickname_user',result["user"]["nickname_user"]);
        } else if(result = "Usuario no encontrado") {
          alert(result);
        } else if(result = "Credenciales inválidas") {
          alert(result);
        }
      });
    }
  }

  //SignUp
  onSubmitSignUp(){
    if (this.signUpForm.valid) {
      if (this.signUpForm.value.password_user === this.signUpForm.value.repeat_password_user) {
        let newUser = new User(
          this.signUpForm.value.name_user as string,
          this.signUpForm.value.surname_user as string,
          this.signUpForm.value.nickname_user as string,
          parseInt(this.signUpForm.value.age_user as string, 10) || 0,
          this.signUpForm.value.email_user as string,
          parseInt(this.signUpForm.value.age_user as string, 10) || 0,
          this.signUpForm.value.password_user as string
        );
        
        this.postService.postUserSignUp(newUser).subscribe((result) => {console.log(result)});
        
        console.log(this.signUpForm.value);
        this.isLogInFormVisible = true;
        this.isSignUpFormVisible = false;
      }else{
        alert("Las contraseñas no coinciden")
      }
    }else{
      alert("Formulario invalido")
    }
  }

  //Contraseña segura

  //Scroll
  ngOnInit(): void {
    this.scrollToView();
  }
  scrollToView(){
    this.el.nativeElement.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"});
  }
}
