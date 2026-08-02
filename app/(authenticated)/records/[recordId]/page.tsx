import CaseNotes from "@/components/profile/CaseNotes";
import EmployerAssociation from "@/components/profile/EmployerAssociation";
import PersonalInformation from "@/components/profile/PersonalInformation";
import ProfileHeaderCard from "@/components/profile/ProfileHeaderCard";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileTabs from "@/components/profile/ProfileTabs";
import type { CaseNote, ProfileDetail, RelatedContact } from "@/data/profile";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type RecordPageProps = {
  params: Promise<{
    recordId: string;
  }>;
};

type EmployerRelationship = {
  name: string;
  registration_number: string | null;
  sector: string | null;
  country: string | null;
  city: string | null;
  compliance_status: string | null;
};

function getEmployer(
  value: EmployerRelationship | EmployerRelationship[] | null,
) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not Recorded";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function calculateAge(dateOfBirth: string | null) {
  if (!dateOfBirth) {
    return null;
  }

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default async function RecordPage({ params }: RecordPageProps) {
  const { recordId } = await params;
  const supabase = await createClient();

  const { data: record, error } = await supabase
    .from("migration_records")
    .select(
      `
      id,
      migration_id,
      full_name,
      date_of_birth,
      gender,
      nationality,
      passport_number,
      languages,
      record_type,
      visa_type,
      visa_status,
      stage,
      arrival_date,
      visa_expiry,
      point_of_entry,
      destination_country,
      destination_city,
      position_title,
      skill_level,
      primary_need,
      employers (
        name,
        registration_number,
        sector,
        country,
        city,
        compliance_status
      ),
      case_notes (
        id,
        note,
        created_at,
        profiles (
          full_name,
          title
        )
      ),
      related_contacts (
        id,
        name,
        relationship,
        contact_type,
        contact_value,
        category
      )
    `,
    )
    .eq("migration_id", recordId)
    .single();

  if (error || !record) {
    notFound();
  }

  const employer = getEmployer(record.employers);

  const age = calculateAge(record.date_of_birth);

  const personalInformation: ProfileDetail[] = [
    {
      label: "Full Name",
      value: record.full_name,
    },
    {
      label: "Date of Birth",
      value: `${formatDate(record.date_of_birth)}${
        age !== null ? ` (${age} yrs)` : ""
      }`,
    },
    {
      label: "Gender",
      value: record.gender ?? "Not Recorded",
    },
    {
      label: "Nationality",
      value: record.nationality,
    },
    {
      label: "Language(s)",
      value: record.languages?.join(", ") || "Not Recorded",
    },
  ];

  const migrationInformation: ProfileDetail[] = [
    {
      label: "Migration ID",
      value: record.migration_id,
    },
    {
      label: "Visa Type",
      value: record.visa_type ?? "Not Recorded",
    },
    {
      label: "Arrival Date",
      value: formatDate(record.arrival_date),
    },
    {
      label: "Visa Expiry",
      value: formatDate(record.visa_expiry),
    },
    {
      label: "Point of Entry",
      value: record.point_of_entry ?? "Not Recorded",
    },
  ];

  const notes: CaseNote[] = (record.case_notes ?? [])
    .map((note) => {
      const authorRelation = Array.isArray(note.profiles)
        ? note.profiles[0]
        : note.profiles;

      return {
        author: authorRelation?.full_name ?? "Authorized Ministry User",
        date: new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(note.created_at)),
        content: note.note,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const relatedContacts: RelatedContact[] = (record.related_contacts ?? []).map(
    (contact) => ({
      initials: getInitials(contact.name),
      name: contact.name,
      description: contact.relationship ?? "Related Contact",
      contact: contact.contact_value ?? "Not Recorded",
      category: contact.category ?? contact.relationship ?? "Contact",
    }),
  );

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-375">
        <ProfileHeaderCard
          name={record.full_name}
          nationality={record.nationality}
          profileId={record.migration_id}
          passportNumber={record.passport_number ?? "Not Recorded"}
          status={record.visa_status ?? "Status Not Recorded"}
        />

        <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
          <section className="min-w-0 rounded-xl border border-[#edf0f3] bg-white p-5 shadow-[0_2px_8px_rgba(16,24,40,0.03)] sm:p-6">
            <ProfileTabs />

            <div className="mt-8 space-y-12">
              <PersonalInformation
                personalInformation={personalInformation}
                migrationInformation={migrationInformation}
              />

              <EmployerAssociation
                employer={{
                  company: employer?.name ?? "No Employer Assigned",
                  registration: employer?.registration_number ?? "Not Recorded",
                  position: record.position_title ?? "Not Recorded",
                  skillLevel: record.skill_level ?? "Not Recorded",
                  location: [
                    record.destination_city,
                    record.destination_country,
                  ]
                    .filter(Boolean)
                    .join(", "),
                  emirates: employer?.sector ?? "Sector Not Recorded",
                  verified: employer?.compliance_status === "verified",
                }}
              />

              <CaseNotes
                recordId={record.id}
                migrationCode={record.migration_id}
                notes={notes}
              />
            </div>
          </section>

          <ProfileSidebar relatedContacts={relatedContacts} />
        </div>
      </div>
    </div>
  );
}
