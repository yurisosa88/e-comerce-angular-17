import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { SpinnerService } from "@shared/services/spinner.service";

@Component({
    selector: 'app-spinner',
    imports: [CommonModule],
    template: `    
    @if (isLoading()) {
        <div class="overlay">
            <div class="flex justify-center items-center">
                <div
                    class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-orange-500"
                ></div>
            </div>
            </div> 
    }      
    `,
    standalone: true
})
export class SpinnerComponent {
    private readonly _spinnerSvc = inject(SpinnerService);
    isLoading = this._spinnerSvc.isLoading;
}