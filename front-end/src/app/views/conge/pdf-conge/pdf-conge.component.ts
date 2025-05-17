import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-pdf-conge',
  templateUrl: './pdf-conge.component.html',
  styleUrls: ['./pdf-conge.component.scss']
})
export class PdfCongeComponent implements OnInit {

  array_sold
  // constructor() { }



  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;

  ngOnInit(): void {

    this.info_service.getHistoriqueConge(this.activatedRoute.snapshot.url[1].path,JSON.parse(sessionStorage.getItem("usersession")).data.ID).subscribe
    (res=>{
    
      // console.log(res)
      // console.log(res.pwd)
    
      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        this.array_sold=res.data
        this.info_service.getConge(this.activatedRoute.snapshot.url[1].path).subscribe
        (res=>{
        
          // console.log(res)
          // console.log(res.pwd)
        
          if(res.response=="non"){
            alert("PROBLEME DE SERVEUR")
          }else{

            // console.log(res.info_validateur)
            console.log(res.info_validateur)
            

            var json=JSON.stringify(this.array_sold)
            var json1=JSON.stringify(res.info_validateur)
            let formData = new FormData();
           formData.append("id",this.activatedRoute.snapshot.url[1].path)
           
           formData.append("historique_solde",json)
           formData.append("info_validateur",json1)
          // formData.append("historique_solde","")
          //  formData.append("info_validateur","")
  
            this.info_service.pdf_conge(formData).subscribe
            (res=>{
        
            
              if(res.response=="non"){
                alert("PROBLEME DE SERVEUR")
              }else{
                // console.log(res.user)
                // this.router.navigate(['conge/pdf/'+index]);
              }
              
            },
            error=>{
              console.log(error)
              this.approot.progressBar=false;
            })
            
    
       
          }
          
        },
        error=>{
          console.log(error)
          this.approot.progressBar=false;
        })
        


      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })



  }

  constructor(private http: HttpClient,private info_service:InfoService, private router: Router,private approot:DefaultLayoutComponent,
    private activatedRoute: ActivatedRoute,private connexion:ConnexionService) {
      let url = this.connexion.base_url+"pdf/pdf"+this.activatedRoute.snapshot.url[1].path+".pdf"; // Or your url http://localhost:81/
      this.downloadFile(url).subscribe(
          (res) => {
              this.pdfViewerAutoLoad.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
              this.pdfViewerAutoLoad.refresh(); // Ask pdf viewer to load/refresh pdf
          }
      );
  }
 

  

  private downloadFile(url: string): any {
        return this.http.get(url, { responseType: 'blob' })
            .pipe(
                map((result: any) => {
                    return result;
                })
            );
    }

  public openPdf() {
    let url = "url to fetch pdf as byte array"; // E.g. http://localhost:3000/api/GetMyPdf
    // url can be local url or remote http request to an api/pdf file. 
    // E.g: let url = "assets/pdf-sample.pdf";
    // E.g: https://github.com/intbot/ng2-pdfjs-viewer/tree/master/sampledoc/pdf-sample.pdf
    // E.g: http://localhost:3000/api/GetMyPdf
    // Please note, for remote urls to work, CORS should be enabled at the server. Read: https://enable-cors.org/server.html

    this.downloadFile(url).subscribe(
    (res) => {
        this.pdfViewerOnDemand.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewerOnDemand.refresh(); // Ask pdf viewer to load/reresh pdf
      }
    );
  }

}
