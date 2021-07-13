const mongoose =require('mongoose')
 

const admissionSchema ={
    dclass:{
        type:String
    },
    name : {
        type:String,
    },
    email :{
        type:String
    },
    Admission_class: {
        type:String,
    },
    dob : {
        type:String,
    },
    dob_day:{
        type:String
    },
    dob_month:{
        type:String
    },
    dob_year:{
        type:String
    },
    nationality : {
        type:String,
    },
    Religion : {
        type:String,
    },
    Gender : {
        type:String,
    },
    father : {
        name : {
            type:String,

        },
        Occupation: {
            type:String,

        },
        Designation : {
            type:String,

        },
        annualIncome : {
            type:String,

        },
        organisationsNameAndAddress: {
            type:String,
        },
        academicQualification : {
            type:String,
        },
        
       PhoneNo : {
            type:String,
        }
    },
    mother :{

        name : {
            type:String,
        },
        Occupation: {
            type:String,
        },
        Designation : {
            type:String,
        },
        annualIncome : {
            type:String,
        },
        organisationsNameAndAddress: {
            type:String,
        },
        academicQualification : {
            type:String,
        },
        
       PhoneNo : {
            type:String,
        }

    },
    address1:{
        town :{
            type:String,
        },
        state :{
            type:String,
        },
        Country:{
            type:String,
        }
    },
    address2:{
        present:{
            type:String,
            
        },
        permanent:{
            type:String,
           
        }
    },
    sibling :{
        one :{
            name :{
                type:String
            },
            admsnNo:{
                type:String
            },
            class:{
                type:String
            },
            sec:{
                type:String
            }
        },
        two :{
            name :{
                type:String
            },
            admsnNo:{
                type:String
            },
            class:{
                type:String
            },
            sec:{
                type:String
            }
        }
        
        
    },
    Any_other_info:{
        type:String
    },
    studentPic :{
        type:String,

    },
    fpic:{
        type:String
    },
    mpic:{
        type:String
    },
    sign:{
        type:String,
    },
    payment:{
        order_id:{
            type:Number,
        }
    },
     
    prev_school:{
        type:String,
    },
    prev_class:{
        type:String,
    },
    prev_position:{
        type:String,
    },
    prev_medium:{
        type:String,
    },
    skills:{
        type:String,
    },
    skills_certificate:{
        type:String,
    },
    prev_result:{
        type:String,
    },
    submit :{
        type:Boolean,
        default : false
    },
    eleven:{
        name:{
            type:String
        },
        mob:{
            type:String
        },
        dob:{
            type:String
        },
        category:{
            type:String
        },
        yop:{
            type:String
        },
        school:{
            type:String
        },
        nob:{
            type:String
        },
        agg:{
            type:String
        },
        maths:{
            type:String
        },
        science:{
            type:String
        },
        ceng:{
            type:String
        },
        cmaths:{
            type:String
        },
        stream:{
            type:String
        },
        one:{
            type:String
        },
        two:{
            type:String
        },
        three:{
            type:String
        },
        four:{
            type:String
        },
        five:{
            type:String
        },
        six:{
            type:String
        },
        cone:{
            type:String
        },
        ctwo:{
            type:String
        },
        cthree:{
            type:String
        },
        cfour:{
            type:String
        },
        cfive:{
            type:String
        },
        csix:{
            type:String
        },
        father:{
            type:String
        },
        mother:{
            type:String
        },
        email:{
            type:String
        },
        Occupation:{
            type:String
        },
        phno:{
            type:String
        },
        adress:{
            type:String
        },
        pic:{
            type:String
        },
        fpic:{
            type:String
        },
    }
    
   
}
const dadmissionForm=mongoose.model('admissionForm',admissionSchema)
module.exports =dadmissionForm