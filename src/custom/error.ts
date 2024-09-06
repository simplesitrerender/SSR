import { colors } from "../../libs/constt/colors";

class cError {
    send(errorS:any) {
        switch(errorS) {
            case "var-not-defined":
                console.log(colors.red+colors.bold+'ERROR'+' => '+colors.reset+colors.red+'The variable you are trying to acess is either not defined or not importet'+colors.reset);
            case "files-modified":
                console.log(colors.red+colors.bold+'ERROR'+' => '+colors.reset+colors.red+'Some of the importent files are modified! Watch out if you are modifying files that are important'+colors.reset)
        }
    }
  }

const sError = new cError();
  
export {sError} 