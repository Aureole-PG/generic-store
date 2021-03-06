import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MyValidators } from 'src/utils/validators';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  form: FormGroup;
  image$: Observable<any>
  constructor(private formBuilder: FormBuilder, 
    private  productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage
    ) { 
    this.buildForm()
  }

  ngOnInit(): void {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      id:['',[Validators.required]],
      title: ['',[Validators.required]],
      price: [0,[Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['',[Validators.required]]
    })
  }

  public uploatFile(event){
    const file = event.target.files[0];
    // const name = file.name;
    // const fileRef = this.storage.ref(dir);
    // const task = this.storage.upload(dir, file);
    // task.snapshotChanges().pipe(
    //   finalize(()=> this.image$ = fileRef.getDownloadURL())
    // )
    console.log(file)
  }

  public saveProduct(event: Event){
    event.preventDefault()
    if (this.form.valid) {
      const product= this.form.value;
      this.productsService.createProduct(product).subscribe(res=>{
        this.router.navigate(['./admin/products'])
      })

    }
  }
  get priceField(){
    return this.form.get('price')
  }

}
