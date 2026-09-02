import { submitEmployerApplication } from "../action";

export default function NewEmployerApplicationPage() {
  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Employer Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
            Submit Worker Application
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Register a worker for employment, migration, or humanitarian
            processing.
          </p>
        </header>

        <form
          action={submitEmployerApplication}
          className="mt-7 rounded-xl border border-[#e2e6eb] bg-white p-6 sm:p-8"
        >
          <section>
            <h2 className="text-lg font-bold">
              Worker & Movement Details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-xs font-bold uppercase text-[#667085]">
                  Application Type
                </span>

                <select
                  name="applicationType"
                  required
                  className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3"
                >
                  <option value="">Select</option>

                  <option value="outbound">
                    Going abroad for employment
                  </option>

                  <option value="inbound">
                    Entering the country for employment
                  </option>

                  <option value="refugee">
                    Refugee / Humanitarian Protection
                  </option>
                </select>
              </label>

              <Field
                label="Full Name"
                name="fullName"
              />

              <Field
                label="Nationality"
                name="nationality"
              />

              <Field
                label="Passport Number"
                name="passportNumber"
              />

              <Field
                label="Origin Country"
                name="originCountry"
              />

              <Field
                label="Destination Country"
                name="destinationCountry"
              />

              <Field
                label="Destination City"
                name="destinationCity"
                required={false}
              />

              <Field
                label="Position / Job Title"
                name="positionTitle"
                required={false}
              />

              <Field
                label="Visa Type"
                name="visaType"
                required={false}
              />
            </div>
          </section>

          <div className="mt-8 flex flex-col justify-end gap-3 border-t border-[#e2e6eb] pt-6 sm:flex-row">
            <button
              type="button"
              className="h-11 rounded-md border border-[#d8dde5] px-6 text-sm font-semibold"
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="h-11 rounded-md bg-[#181818] px-6 text-sm font-semibold text-white"
            >
              Submit to Ministry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required = true,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-xs font-bold uppercase text-[#667085]">
        {label}
      </span>

      <input
        name={name}
        required={required}
        className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] px-3 text-sm outline-none focus:border-[#202124]"
      />
    </label>
  );
}