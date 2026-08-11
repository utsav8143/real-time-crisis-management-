import React from "react";


const AIClassification = () => {
  return (
    <section className="scroll-mt-27" id="ai-classification">
      <div className="mt-20 lg:flex">
        <div className="lg:w-1/2 pe-10">
          <h1 className="text-primary">THE AI CLASSIFICATION ENGINE</h1>
          <h2 className="mt-10 text-4xl text-white">
            Severity, without the wait.
          </h2>
          <p className="mt-7 text-gray-400">
            A citizen's raw report goes into the Gemini API. A structured
            severity rating and a one-line summary come back — before an admin
            ever has to read the full text. That's what replaces manual triage:
            no report sits unclassified while the situation on the ground keeps
            changing.
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-600 rounded-xl lg:mt-0 mt-10">
          <div className="">
            <div className="border-b border-b-gray-600 h-7  p-1.5 flex gap-2 ps-4">
              <div className="h-3 w-3 rounded-xl bg-red-800"></div>
              <div className="h-3 w-3 rounded-xl bg-yellow-800"></div>
              <div className="h-3 w-3 rounded-xl bg-green-800"></div>
            </div>
            <div className="p-8">
              <h2 className="text-gray-400"> classify ( </h2>
              <p className="text-green-500 mt-2">
                "Smoke coming from the warehouse on 3rd Ave, getting worse"
                <p className="text-gray-400">)</p>
              </p>
              <div className="mt-6 text-gray-400">
                <div>
                  <span className="text-blue-700">"severity"</span> :{" "}
                  <span className="text-red-500">"critical"</span>
                </div>
                <div>
                  {" "}
                  <span className="text-blue-700">"category"</span> :{" "}
                  <span className="text-green-500">"fire"</span>
                </div>
                <div>
                  <span className="text-blue-700">"summary"</span> :{" "}
                  <span className="text-green-500">
                    "Active fire, Zone 01 warehouse, spreading"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </section>
  );
};

export default AIClassification;
