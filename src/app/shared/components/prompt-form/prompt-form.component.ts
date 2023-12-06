import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-prompt-form',
  templateUrl: './prompt-form.component.html',
  styleUrl: './prompt-form.component.scss'
})
export class PromptFormComponent {
  readonly samplingModules: {
    title: string;
    value: string;
  }[] = [
    {
      title: 'PLMS',
      value: 'plms'
    },
    {
      title: 'DDIM',
      value: 'ddim'
    },
    {
      title: 'Heun',
      value: 'heun'
    },
    {
      title: 'Euler',
      value: 'euler'
    },
    {
      title: 'Euler Ancestral',
      value: 'euler_a'
    },
    {
      title: 'DPM2',
      value: 'dpm2'
    },
    {
      title: 'DPM2 Ancestral',
      value: 'dpm2_a'
    },
    {
      title: 'LMS',
      value: 'lms'
    },
    {
      title: 'DPM Solver (Stability AI)',
      value: 'dpm_solver_stability'
    },
    {
      title: 'DPM++ 2s Ancestral (Karras)',
      value: 'dpmpp_2s_a'
    },
    {
      title: 'DPM++ 2m (Karras)',
      value: 'dpmpp_2m'
    },
    {
      title: 'DPM++ SDE (Karras)',
      value: 'dpmpp_sde'
    },
    {
      title: 'DPM Fast (Karras)',
      value: 'dpm_fast'
    },
    {
      title: 'DPM Adaptive (Karras)',
      value: 'dpm_adaptive'
    },
    {
      title: 'DDPM',
      value: 'ddpm'
    },
    {
      title: 'DEIS',
      value: 'deis'
    },
    {
      title: 'UniPC SNR',
      value: 'unipc_snr'
    },
    {
      title: 'UniPC TU',
      value: 'unipc_tu'
    },
    {
      title: 'UniPC SNR 2',
      value: 'unipc_snr_2'
    },
    {
      title: 'UniPC TU 2',
      value: 'unipc_tu_2'
    },
    {
      title: 'UniPC TQ',
      value: 'unipc_tq'
    }
  ];
  readonly imageSizes: number[] = [
    128, 192, 256, 320, 384, 338, 512, 576, 640, 704, 768, 832, 896, 960, 1024, 1280, 1536
  ];

  form: FormGroup = new FormGroup<any>({
    prompt: new FormControl('', [Validators.required]),
    negativePrompt: new FormControl(''),
    steps: new FormControl(25, [Validators.required]),
    imageQuality: new FormControl(50, [Validators.required]),
    width: new FormControl(512, [Validators.required]),
    height: new FormControl(512, [Validators.required]),
    outputsNumber: new FormControl(1, [Validators.required]),
    cfgScale: new FormControl(10, [Validators.required]),
    samplingModule: new FormControl('plms', [Validators.required]),
    seed: new FormControl(this.getRandomIntInclusive(1, 999999), [Validators.required])
  });

  constructor(private customerService: CustomerService) {}

  private getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  submit() {
    if (this.form.valid) {
      this.customerService.createPromptRequest(this.form.value).subscribe({
        next: (createPromptResponse) => {
          console.log('Create prompt response:', createPromptResponse);
          if (createPromptResponse.success) {
            this.customerService.promptId = createPromptResponse.data.id;
            this.customerService.promptData = createPromptResponse.data;
            this.customerService.turnOnStatusChecker();
            this.form.get('seed')?.setValue(this.getRandomIntInclusive(1, 999999));
          }
        }
      });
    }
  }
}
