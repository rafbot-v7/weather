import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
private apiUrl = 'https://api.open-meteo.com/v1'

  constructor(private http: HttpClient) { 
  }
  // get() {
  //   this.http.get(this.apiUrl).subscribe((result: any) => {
  //     console.log(result);
  //   })
  // }
   // GET request
  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`)
      .pipe(
        retry(2), // Retry failed request up to 2 times
        catchError(this.handleError)
      );
  }

 

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Please check your input';
          break;
        case 401:
          errorMessage = 'Unauthorized: Please login again';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission';
          break;
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 500:
          errorMessage = 'Server error: Please try again later';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    // Log error for debugging (you might want to use a logging service)
    console.error(errorMessage);
    
    // Return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }
}
