import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    testButtonDisabled: boolean;
    testMessage: string;

  constructor(private testService: TestService) { }

  ngOnInit() {
  }

  onTest() {
    if (this.testButtonDisabled) return;

    this.testButtonDisabled = true;
    setTimeout(() => {
        this.testButtonDisabled = false;
    }, 1000);

    const test = new TestCases(this.testService);

    test.testHttpGet(message => this.testMessage = message);
    test.testHttpPost();

}

}

class TestCases {

    constructor(private testService: TestService) {
    }

    testHttpPost() {
        const obj = {
            name: 'leo'
        };

        this.testService.post(obj).subscribe(resp => {
            console.log('post resp: ', resp);
        });
    }

    testHttpGet(output: (msg: string) => void) {
        this.testService.get().subscribe(result => {
            let message: string;
            if (typeof result == 'object') {
                message = JSON.stringify(result);
            } else {
                message = result;
            }
            output(message);
        });
    }
}