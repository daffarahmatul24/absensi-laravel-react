import { usePage } from "@inertiajs/react";
import Submitted from "@/Components/Attendance/Submitted";
import Submit from "@/Components/Attendance/Submit";

export default function Attendance(){
    const {submitted} = usePage().props;

    if(submitted){
        return <Submitted />; //informasi sudah absen
    }else{
        return <Submit />;  //form absen
    }
}