import { differenceInMinutes, differenceInHours} from "date-fns";

const Time = class {
    private time_as_date: Date;


    public constructor(time_int?:number, hours?:number, minutes?:number) {
        console.log(time_int, hours, minutes)
        if ((time_int && hours) || (hours && minutes)) {
            throw Error("Bad input")
        }

        if (time_int) {
            const hours = Math.floor(time_int/100);
            const minutes = time_int%100;
        }

        const currentDate = new Date();

        this.time_as_date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            hours,
            minutes
        );


        return;
    }

    public get time_as_int() {

        console.log(this.time_as_date);

        const time_int:number = (
            this.time_as_date.getHours() * 100 
            + this.time_as_date.getMinutes()
        );

        return time_int;
    }

    public interval(time1:InstanceType<typeof Time>, time2?:InstanceType<typeof Time>){
        const time2Date:Date = (time2 === undefined)?this.time_as_date:time2.time_as_date;
        
        const hours = differenceInHours(time1.time_as_date, time2Date);
        const mins = differenceInMinutes(time1.time_as_date, time2Date);
        return new Time(undefined,hours,mins);
    }

    public get getMinutes() {
        return this.time_as_date.getMinutes();
    }

    public get getHours() {
        return this.time_as_date.getHours();
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
    