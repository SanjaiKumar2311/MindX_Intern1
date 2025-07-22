import { RegisterForm } from "@/features/auth/components";
import logo from "@/assets/mindx_service_logo_32x32.svg";
// import logo1 from "@/assets/mindx_service_logo_white_32x32.svg";
import helpdesk from "@/assets/help-desk-girl.svg";



const Register = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md ">
              <img src={logo} alt="mindx_service_ai" />
            </div>
            Service AI.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>



	        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <img
          // src="https://ui.shadcn.com/placeholder.svg"
          src={helpdesk}
          alt="Image"
          // className="absolute inset-0 h-full w-full object-cover  dark:brightness-[0.2] dark:grayscale"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        {/* <div className="absolute inset-0 bg-black/60" /> */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10" />
       {/* <div className="relative z-20 flex items-center text-lg font-medium">

            <img src={logo1} alt="mindx_service_ai" className="mr-2 h-6 w-6" />
            Service AI
          </div> */}
                  <div className="relative z-20 mt-auto">          
          <blockquote className="space-y-2">
            <p className="text-lg">
                                &ldquo;Our agents are dramatically more efficient when using Copilot. In testing, agents using Copilot were able to close 31% more customer conversations daily, compared to agents not using Copilot.&rdquo;
            </p>
                           <div className="font-display text-sm mt-6 flex flex-row items-center">
                    <div>
                      <div className="font-semibold mb-1 text-white">
                        Swaroop Naik
                      </div>
                      <div className="text-white">Senior Manager, Software Development,
Mercedes-Benz India</div>
                    </div>
                  </div>
 
          </blockquote>
        </div>


      </div>
      
    </div>
  );
};

export default Register;
