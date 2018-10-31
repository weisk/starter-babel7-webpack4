
export class ConsoleDisplay {
  display() {
    const welcomeMessage = 'Hello webbbp back!';

    console.log(welcomeMessage);
    document.body.innerHTML = welcomeMessage;
  }
}
