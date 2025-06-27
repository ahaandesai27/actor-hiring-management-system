import { usePdfExtraction } from "./hooks/usePdfExtraction";

function ResumeUploadForm({ resume, setResume, onNext, onBack, loadingAI }) {
  const { handlePdfSelect, pdfLoading, pdfFile } = usePdfExtraction(setResume);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(resume);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#ffbf00]">
          Upload Resume or Write Bio
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium leading-6 text-white">
            Upload your resume (PDF) or write a short paragraph about yourself
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfSelect}
            className="block w-full text-white mt-2"
          />
          <div className="my-2 text-gray-400 text-xs">or</div>
          <textarea
            rows={6}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Paste your resume or write about your experience..."
          />
        </div>
        <button
          type="submit"
          disabled={loadingAI || pdfLoading}
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ffbf00] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loadingAI || pdfLoading ? "Processing..." : "Next"}
        </button>
        <button
          type="button"
          className="w-full mt-2 text-sm text-gray-400 hover:text-red-400"
          onClick={onBack}
        >
          Back
        </button>
      </form>
    </>
  );
}

export default ResumeUploadForm;