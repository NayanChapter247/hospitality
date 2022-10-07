import React, { useState, useEffect } from "react";
import Footer from "../components/common-components/Footer";
import Header from "../components/common-components/Header";
import Lottie from "react-lottie";
import imageDAta from "../public/images/lottiesFile/image-placeholder.json";
import { useRouter } from "next/router";
import {
  GetRequest,
  awsUrl,
  userDataProvider,
} from "../components/helpers/ApiHelper";
import { multipleMediaIdentifier } from "../components/helpers/HelperFunctions";
import Loader from "../components/common-components/Loader";
import Resume from "./../components/resume-components/resume";
import NewResume from "../components/resume-components/newresume";
const ImageLottie = {
  loop: true,
  autoplay: true,
  animationData: imageDAta,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function UserDetails() {
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState("");
  const router = useRouter();

  let candidateId = router.query.id;
  useEffect(() => {
    if (candidateId !== undefined) {
      fetchCandidateDetails();
    }
  }, [candidateId]);
  const fetchCandidateDetails = async () => {
    const userData = userDataProvider();
    setLoading(true);
    if (userData !== "" && userData !== undefined && userData !== null) {
      let res = await GetRequest(
        "getCandidateResume/" + userData._id + "/" + candidateId
      );
      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
      } else {
        router.push("/packs");
      }
    } else {
      router.push("/");
    }
  };

  function getYearOfExperience(monthCount) {
    function getPlural(number, word) {
      return (number === 1 && word.one) || word.other;
    }
    var months = { one: "month", other: "months" },
      years = { one: "year", other: "years" },
      m = monthCount % 12,
      y = Math.floor(monthCount / 12),
      result = [];
    y && result.push(y + " " + getPlural(y, years));
    m && result.push(m + " " + getPlural(m, months));
    return result.join(" , ");
  }

  return (
    <div>
      {process.browser ? (
        <>
          <Header PageName="menu" />
          {loading === true ? (
            <Loader />
          ) : (
            <div>
              {data !== "" && data !== undefined && data !== null ? (
                <NewResume data={data} />
              ) : (
                // <>

                //   <div className="h-20 text-center text-2xl pt-5 font-bold">
                //     Curriculum vitae
                // </div>

                //   <p className="text-xl lg:text-2xl 3xl:text-3xl  pl-5 uppercase text-center">  {data.type_of_employement} Profile</p>
                //   <div className="grid grid-cols-12 pt-10">
                //     <div className="col-span-12 lg:col-span-4">
                //       {data.photo_of_candidate !== "" && data.photo_of_candidate !== undefined ? (
                //         <img
                //           src={awsUrl + data.photo_of_candidate.split(/\s*(,)\s*/)[0]}
                //           alt="Looking for a chef"
                //           className="w-full h-[200px] sm:h-[300px] md:h-[500px] lg:h-[400px] object-contain"
                //         />
                //       ) : (
                //           <div className="text-center py-20">
                //             Photo Not Available
                //           </div>
                //         )}
                //       <div className="pt-10">
                //         <div className="py-5 px-5 ">
                //           {data.photo_of_candidate !== "" && data.photo_of_candidate !== undefined ? (
                //             <>
                //               <p className="text-3xl"> Candidate Photos</p>
                //               <div className="grid grid-cols-12 pt-4">
                //                 {multipleMediaIdentifier(data.photo_of_candidate).map(
                //                   (candidate, i) => {
                //                     return (
                //                       <div
                //                         className="col-span-6 sm:col-span-4 lg:col-span-3 p-2"
                //                         key={i}
                //                       >
                //                         <img
                //                           alt="The Master Chefs"
                //                           src={awsUrl + candidate.media}
                //                           className="h-40 w-full object-contain rounded "
                //                         />
                //                       </div>
                //                     );
                //                   }
                //                 )}
                //               </div>
                //             </>
                //           ) : (
                //               ""
                //             )}
                //         </div>

                //       </div>
                //     </div>

                //     <div className="col-span-12 lg:col-span-8">
                //       <p className="text-2xl pl-5 pb-2 uppercase">
                //         {data.name_of_candidate}
                //       </p>
                //       <table className="border border-[#DBDDE0] mx-5">

                //         <tbody >

                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r w-48">Permanent Address</td>
                //             <td className="p-2">{data.permanent_address}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Contact Number</td>
                //             <td className="p-2">   {data.contactno1} {data.contactno2 !== "" ? "," + data.contactno2 : ""}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Relative Contact</td>
                //             <td className="p-2">   {data.relative_contact_no}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Father Name</td>
                //             <td className="p-2">   {data.father_name}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Email </td>
                //             <td className="p-2">{data.email_address !== "" ? data.email_address : "NA"}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Gender</td>
                //             <td className="p-2">{data.gender}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Age</td>
                //             <td className="p-2">{data.age} years</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Marital status</td>
                //             <td className="p-2">{data.marital_status}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Expected salary</td>
                //             <td className="p-2">{data.salary_expectation}/month</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Education</td>
                //             <td className="p-2">{data.education}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Preferred Location</td>
                //             <td className="p-2">{data.location_of_work}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Religion</td>
                //             <td className="p-2">{data.religion}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Job Section</td>
                //             <td className="p-2">{data.category}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Total Experience</td>
                //             <td className="p-2">{getWords(data.experience_in_month)}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Language Known</td>
                //             <td className="p-2">{data.languages}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Aadhar Card no.</td>
                //             <td className="p-2">{data.aadhar_card_no !== "" ? data.aadhar_card_no : "NA"}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Hobbies</td>
                //             <td className="p-2">{data.hobbies_and_interest !== "" ? data.hobbies_and_interest : "NA"}</td>
                //           </tr>
                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Additional Education</td>
                //             <td className="p-2">{data.additionalEducation !== "" ? data.additionalEducation : "NA"}</td>
                //           </tr>

                //           <tr className="border">
                //             <td className="p-2 font-semibold pr-5 border-r">Objective</td>
                //             <td className="p-2">{data.objective !== "" ? data.objective : "NA"}</td>
                //           </tr>
                //         </tbody>
                //       </table>
                //     </div>
                //   </div>
                //   <div className="px-5 sm:px-10 lg:px-60">
                //     {data.experiences !== undefined ?
                //       data.experiences.length > 0 ?
                //         <div className="flex pt-5">
                //           <p className="text-[#000000] drop-shadow-lg font-semiBold text-2xl pt-3 pl-2">
                //             Work Experience
                //           </p>
                //         </div> : "" : ""}

                //     {data.experiences !== undefined ?
                //       data.experiences.map((exp, i) => {
                //         return (
                //           <div className=" border border-[#000000] mt-2 pb-2 rounded " key={i}>
                //             <p className="text-[#000000] fontBold text-xl pt-3 pl-2">
                //               {exp.expOutletName}
                //             </p>
                //             <div
                //               className="grid grid-cols-12"

                //             >

                //               <div className="col-span-12 sm:col-span-8">

                //                 <div className="flex pl-2">
                //                   <p className="text-sm text-[#000000] pt-3">Designation :</p>
                //                   <p className="text-sm text-[#000000] pt-3 pl-2">
                //                     {exp.expDesignation}
                //                   </p>
                //                 </div>
                //                 <div className="flex pl-2">
                //                   <p className="text-sm text-[#000000] pt-3">Place :</p>
                //                   <p className="text-sm text-[#000000] pt-3 pl-2">
                //                     {exp.expCity}
                //                   </p>
                //                 </div>
                //               </div>
                //               <div className="col-span-12 sm:col-span-4">
                //                 <div className="flex">
                //                   <p className="text-sm text-[#000000] pt-3 pl-2 sm:pl-0">Start Date :</p>
                //                   <p className="text-sm text-[#000000] pt-3 pl-2">
                //                     {exp.expStartDate}
                //                   </p>
                //                 </div>
                //                 <div className="flex">
                //                   <p className="text-sm text-[#000000] pt-3 pl-2 sm:pl-0">End Date :</p>
                //                   <p className="text-sm text-[#000000] pt-3 pl-2">
                //                     {exp.expEndDate}
                //                   </p>
                //                 </div>
                //               </div>
                //             </div>
                //           </div>
                //         );
                //       }) : ""}

                //   </div>
                //   <div className="py-5 px-5 ">
                //     {data.dish !== "" && data.dish !== undefined ? (
                //       <>
                //         <p className="text-3xl"> Dish Photos</p>
                //         <div className="grid grid-cols-12 pt-4">
                //           {multipleMediaIdentifier(data.dish).map(
                //             (candidate, i) => {
                //               return (
                //                 <div
                //                   className="col-span-6 sm:col-span-4 lg:col-span-3 p-2"
                //                   key={i}
                //                 >
                //                   <img
                //                     alt="Need Chef for restaurant"
                //                     src={awsUrl + candidate.media}
                //                     className="h-40 w-full object-cover rounded "
                //                   />
                //                 </div>
                //               );
                //             }
                //           )}
                //         </div>
                //       </>
                //     ) : (
                //         ""
                //       )}
                //   </div>
                //   <div className="py-5 px-5 ">
                //     {data.work_experience !== undefined ?
                //       data.work_experience[0].work_certificate !== "" && data.work_experience[0].work_certificate !== undefined ? (
                //         <>
                //           <p className="text-3xl">Work Certificate</p>
                //           <div className="grid grid-cols-12 pt-4">
                //             {multipleMediaIdentifier(
                //               data.work_experience[0].work_certificate
                //             ).map((candidate, i) => {
                //               return (
                //                 <div
                //                   className="col-span-6 sm:col-span-4 lg:col-span-3 p-2"
                //                   key={i}
                //                 >
                //                   <img
                //                     alt="Where to find Cooks"
                //                     src={awsUrl + candidate.media}
                //                     className="h-40 w-full object-cover rounded "
                //                   />
                //                 </div>
                //               );
                //             })}
                //           </div>
                //         </>
                //       ) : (
                //           ""
                //         ) : ""}
                //   </div>
                // </>
                ""
              )}
            </div>
          )}
          <Footer />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserDetails;
