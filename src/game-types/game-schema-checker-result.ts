export class GameSchemaCheckerResult {

    private resultMsg = '';

    public get resultMessage(): string {
        return this.resultMsg;
    }

    public set resultMessage(value: string) {
        this.resultMsg = value;
    }

    private err = false;

    public get error(): boolean {
        return this.err;
    }

    public set error(value: boolean) {
        this.err = value;
    }

    private sts = 0;

    public get status(): number {
        return this.sts;
    }

    public set status(value: number) {
        this.sts = value;
    }

}
