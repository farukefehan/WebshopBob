import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule]
})

export class RegisterComponent implements OnInit{
  
  public registerForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService){

  }


  ngOnInit(): void {

    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128)]],
      repeated_password: ['']
    });
  }

  public onSubmit(): void{
    console.log('ok');
  }
}
