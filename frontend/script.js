console.log("SCRIPT LOADED SUCCESSFULLY");

async function uploadResume() {

    const fileInput =
        document.getElementById(
            "resumeFile"
        );

    const file =
        fileInput.files[0];

    if (!file) {

        alert(
            "Please select a PDF file"
        );

        return;
    }

    try {

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        const response =
            await fetch(
                "http://127.0.0.1:8000/upload-resume/", {
                    method: "POST",
                    body: formData
                }
            );

        const data =
            await response.json();

        console.log(
            "UPLOAD RESULT:",
            data
        );

        localStorage.setItem(
            "uploadResult",
            JSON.stringify(data)
        );

        window.location.href =
            "upload_result.html";

    } catch (error) {

        console.error(error);

        alert(
            "Resume upload failed."
        );
    }
}

async function runAnalysis() {

    console.log("BUTTON CLICKED");

    const text = document.getElementById("resumeText").value;
    const role = document.getElementById("targetRole").value;

    const response = await fetch(
        `http://127.0.0.1:8000/dashboard?text=${encodeURIComponent(text)}&role=${encodeURIComponent(role)}`
    );

    const data = await response.json();

    console.log("DATA RECEIVED:", data);

    localStorage.setItem(
        "careerResult",
        JSON.stringify(data)
    );

    window.location.href = "result.html";
}

async function matchJob() {

    const resumeText =
        document.getElementById(
            "jobResume"
        ).value;

    const jobText =
        document.getElementById(
            "jobDescription"
        ).value;

    const response =
        await fetch(

            `http://127.0.0.1:8000/job-description-match?resume_text=${encodeURIComponent(resumeText)}&job_text=${encodeURIComponent(jobText)}`

        );

    const data =
        await response.json();
    localStorage.setItem(
        "jobMatchResult",
        JSON.stringify(data)
    );

    window.location.href =
        "job_match_result.html";
}

async function compareResumes() {

    const resume1 =
        document.getElementById(
            "resume1"
        ).value;

    const resume2 =
        document.getElementById(
            "resume2"
        ).value;

    const response =
        await fetch(

            `http://127.0.0.1:8000/compare-two-resumes?resume1=${encodeURIComponent(resume1)}&resume2=${encodeURIComponent(resume2)}`

        );

    const data =
        await response.json();

    localStorage.setItem(
        "compareResult",
        JSON.stringify(data)
    );

    window.location.href =
        "compare_result.html";
}