export class Task {
    constructor(
        public id: Number,
        public title: String,
        public dateInit: Date,
        public dateEnd: Date,
        public done: boolean,
        public user: string
    ) { }
}
