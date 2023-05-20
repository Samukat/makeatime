import { differenceInMinutes, differenceInHours, addMinutes, min} from "date-fns";

const Time = class {
    private time_as_date: Date;
    private time_length?: number;


    public constructor(time_int?:number, hours?:number, minutes?:number, length?:number) {
        // if ((time_int && hours) || (hours && !minutes)) {
        //     throw Error("Bad input")
        // }

        if (time_int != undefined) {
            
            hours = Math.floor(time_int/100);
            minutes = time_int%100;
            
        }

        const currentDate = new Date();

        this.time_as_date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            hours,
            minutes
        );

        this.time_length = length;
        return;
    }

    public get time_as_int() {

        const time_int:number = (
            this.time_as_date.getHours() * 100 
            + this.time_as_date.getMinutes()
        );

        return time_int;
    }

    public interval(time1:InstanceType<typeof Time>, time2?:InstanceType<typeof Time>){
        const time2Date:Date = (time2 === undefined)?this.time_as_date:time2.time_as_date;
        
        const hours = differenceInHours(time1.time_as_date, time2Date);
        
        var mins = differenceInMinutes(time1.time_as_date, time2Date);
        mins -= hours*60;

        return new Time(undefined,hours,mins);
    }

    public get getExtraMinutes() {
        return this.time_as_date.getMinutes();
    }

    public get getHours() {
        return this.time_as_date.getHours();
    }

    public get getTotalMinutes() {
        return this.getHours*60 + this.getExtraMinutes;
    }

    public count_intervals(time_interval:number) {
        return Math.floor(this.getTotalMinutes/time_interval);
    }

    public get getLength(){
        return this.time_length;
    }

    public addMinutes(to_add: number) {
        this.time_as_date = addMinutes(this.time_as_date, to_add);
        return this;
    }

    public get endTime(){
        var endDate:Date;
        if (this.getLength != undefined) {
            endDate = addMinutes(this.time_as_date, this.getLength)
            return new Time(undefined, endDate.getHours(), endDate.getMinutes()).time_as_int;
        }

        return this.time_as_int;

    }

    public get timeString() {
        return `${this.getHours==0?"12":(this.getHours>=13?this.getHours-12:this.getHours)}:${this.getExtraMinutes<10?"0":""}${this.getExtraMinutes} ${this.getHours>=12?"pm":"am"}`
    }
};

export default Time;




    //   //Our DB holds times stored as integers, so we need a function to convert the time integers to a DateTime type (for math)... here it is
    //   function ConvertToTime(time: number): Date {
    //     // Convert the time to a string and pad it with leading zeros if necessary
    //     const timeString = time.toString().padStart(4, '0');
    
    //     // Extract the hours and minutes from the time string
    //     const hours = Number(timeString.substring(0, 2));
    //     const minutes = Number(timeString.substring(2, 4));
    
    //     // Create a new Date object with the current date and the extracted hours and minutes
    //     const currentDate = new Date();
    //     const dateTime = new Date(
    //     currentDate.getFullYear(),
    //     currentDate.getMonth(),
    //     currentDate.getDate(),
    //     hours,
    //     minutes
    //     );
    //     return dateTime;
    // };
    