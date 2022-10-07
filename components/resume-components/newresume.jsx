import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "./newresume.module.scss";
import { awsUrl } from "../helpers/ApiHelper";
import { multipleMediaIdentifier } from "../helpers/HelperFunctions";

const NewResume = ({ data }) => {
  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const ref = React.createRef();
  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("test.pdf");
  };
  return (
    <div class={styles["resume-main"]} id="pdf" ref={ref}>
      <div class={styles["left-box"]}>
        <div class={styles.leftprofile}>
          {data?.photo_of_candidate ? (
            <img src={awsUrl + data?.photo_of_candidate?.split(",")[0]} />
          ) : (
            <img
              src={
                "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
              }
            />
          )}
        </div>
        <div className={styles.main}>
          <div className={styles.row}>
            <div>
              <h2 className={styles["main-heading"]}>Profile Info</h2>
              <hr class="hr1 mb-2" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["col-4"]}>
              <div>
                <p class={styles["p5"]} style={{ color: "white" }}>
                  Expected salary:
                </p>
              </div>
            </div>
            <div className={styles["col-8"]}>
              <div>
                <p
                  class={styles["p5"]}
                  style={{
                    color: "white",
                    textAlign: "right",
                    fontWeight: "normal",
                  }}
                >
                  {data?.salary_expectation}/month
                </p>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["col-4"]}>
              <div>
                <p class={styles["p5"]} style={{ color: "white" }}>
                  Education:
                </p>
              </div>
            </div>
            <div className={styles["col-8"]}>
              <div>
                <p
                  class={styles["p5"]}
                  style={{
                    color: "white",
                    textAlign: "right",
                    fontWeight: "normal",
                  }}
                >
                  {data?.education}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["col-4"]}>
              <div>
                <p class={styles["p5"]} style={{ color: "white" }}>
                  Father Name:
                </p>
              </div>
            </div>
            <div className={styles["col-8"]}>
              <div>
                <p
                  class={styles["p5"]}
                  style={{
                    color: "white",
                    textAlign: "right",
                    fontWeight: "normal",
                  }}
                >
                  {data?.father_name}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["col-4"]}>
              <div>
                <p class={styles["p5"]} style={{ color: "white" }}>
                  Gender:
                </p>
              </div>
            </div>
            <div className={styles["col-8"]}>
              <div>
                <p
                  class={styles["p5"]}
                  style={{
                    color: "white",
                    textAlign: "right",
                    fontWeight: "normal",
                  }}
                >
                  {data?.gender}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["col-4"]}>
              <div>
                <p class={styles["p5"]} style={{ color: "white" }}>
                  Marital status:
                </p>
              </div>
            </div>
            <div className={styles["col-8"]}>
              <div>
                <p
                  class={styles["p5"]}
                  style={{
                    color: "white",
                    textAlign: "right",
                    fontWeight: "normal",
                  }}
                >
                  {data?.marital_status}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["col-4"]}>
              <div>
                <p class={styles["p5"]} style={{ color: "white" }}>
                  Relative Contact:
                </p>
              </div>
            </div>
            <div className={styles["col-8"]}>
              <div>
                <p
                  class={styles["p5"]}
                  style={{
                    color: "white",
                    textAlign: "right",
                    fontWeight: "normal",
                  }}
                >
                  {data?.relative_contact_no}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["col-4"]}>
              <div>
                <p class={styles["p5"]} style={{ color: "white" }}>
                  Address:
                </p>
              </div>
            </div>
            <div className={styles["col-8"]}>
              <div>
                <p
                  class={styles["p5"]}
                  style={{
                    color: "white",
                    textAlign: "right",
                    fontWeight: "normal",
                  }}
                >
                  {data?.permanent_address}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["col-4"]}>
              <div>
                <p class={styles["p5"]} style={{ color: "white" }}>
                  Language:
                </p>
              </div>
            </div>
            <div className={styles["col-8"]}>
              <div>
                <p
                  class={styles["p5"]}
                  style={{
                    color: "white",
                    textAlign: "right",
                    fontWeight: "normal",
                  }}
                >
                  {data?.languages}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class={styles["right-box"]}>
        <button
          className="bg-[#1B1465] py-2 3xl:py-3 px-5 text-[#ffffff] text-xl 3xl:text-3xl rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#1b1465] duration-300"
          onClick={createPDF}
          type="button"
          style={{ position: "absolute", right: "10%" }}
        >
          Download
        </button>
        <div class={styles.rightprofile}>
          <img src={awsUrl + data?.photo_of_candidate?.split(",")[0]} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <h1>
            {data?.name_of_candidate}
            <br />
          </h1>

          <span className="text-[18px] text-[#fbbc07] 3xl:text-3xl flex">
            &#9733; &#9733; &#9733; &#9733; &#9733;{" "}
            <p className="text-black pl-3">{`(${randomIntFromInterval(
              100,
              200
            )})`}</p>
          </span>
        </div>
        <h1>
          <span>{data?.contactno1}</span>
        </h1>
        <p class={styles["p3"]}>{data?.category}</p>
        <br />
        <h2 class={styles["heading"]}>Objective</h2>
        <hr class={styles["hr2"]} />
        <br />
        <div class="w-100" style={{ textAlign: "justify" }}>
          {data?.objective !== "" ? data?.objective : "NA"}
        </div>
        <div class={styles["clearfix"]}></div>
        <br />
        <h2 class={styles["heading"]}>WORK EXPERIENCE</h2>
        <hr class="hr2" />
        <br />
        <div class="w-100">
          {data?.length !== 0
            ? data?.experiences.map((exp, i) => {
                return (
                  <li className="list-disc" key={i}>
                    Worked in {exp.expOutletName},{exp.expCity} as a{" "}
                    {exp.expDesignation} from {exp.expStartDate} to{" "}
                    {exp.expEndDate}.
                  </li>
                );
              })
            : ""}
        </div>
        <div class={styles["clearfix"]}></div>
        <br />
        {data?.dish && (
          <>
            <h2 class={styles["heading"]}>Dish Images</h2>
            <hr class="hr2" />
            <div class="w-100">
              <div className="mt-2 grid grid-cols-6 lg:col-span-6 sm:col-span-6 md:py-8">
                {data?.dish
                  ? multipleMediaIdentifier(data.dish).map((val, i) => {
                      return (
                        <div className="col-span-2 md:col-span-1 px-2" key={i}>
                          <img
                            src={awsUrl + val.media}
                            className="md: h-35 sm:h-45 md:w-full object-cover rounded"
                          />
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div class={styles["clearfix"]}></div>
            <br />
          </>
        )}
        <div class={styles["clearfix"]}></div>
        <br />
        {data?.video_of_candidate && (
          <>
            <h2 class={styles["heading"]}>Candidate Videos:</h2>
            <hr class="hr2" />
            <div class="w-100">
              <div className="mt-2 grid grid-cols-6 lg:col-span-6 sm:col-span-6 md:py-8">
                {data?.video_of_candidate
                  ? multipleMediaIdentifier(data.video_of_candidate).map(
                      (val, i) => {
                        return (
                          <div
                            className="col-span-2 md:col-span-1 px-2"
                            key={i}
                          >
                            <video
                              src={awsUrl + val.media}
                              className="md: h-35 sm:h-45 md:w-full object-cover rounded"
                              autoPlay
                            />
                          </div>
                        );
                      }
                    )
                  : ""}
              </div>
            </div>
            <div class={styles["clearfix"]}></div>
            <br />
          </>
        )}
      </div>
      <div class={styles["clearfix"]}></div>
    </div>
  );
};

export default NewResume;
