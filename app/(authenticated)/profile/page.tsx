// src/app/(authenticated)/profile/page.tsx

import CaseNotes from "@/components/profile/CaseNotes";
import EmployerAssociation from "@/components/profile/EmployerAssociation";
import PersonalInformation from "@/components/profile/PersonalInformation";
import ProfileHeaderCard from "@/components/profile/ProfileHeaderCard";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { profileData } from "@/data/profile";

export default function ProfilePage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-375">
        <ProfileHeaderCard
          name={profileData.name}
          nationality={profileData.nationality}
          profileId={profileData.id}
          passportNumber={profileData.passportNumber}
          status={profileData.status}
        />

        <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
          <section className="min-w-0 rounded-xl border border-[#edf0f3] bg-white p-5 shadow-[0_2px_8px_rgba(16,24,40,0.03)] sm:p-6">
            <ProfileTabs />

            <div className="mt-8 space-y-12">
              <PersonalInformation
                personalInformation={profileData.personalInformation}
                migrationInformation={profileData.migrationInformation}
              />

              <EmployerAssociation employer={profileData.employer} />

              <CaseNotes notes={profileData.notes} />
            </div>
          </section>

          <ProfileSidebar relatedContacts={profileData.relatedContacts} />
        </div>
      </div>
    </div>
  );
}