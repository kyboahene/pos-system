import { LucideIcon } from "lucide-react";
import React from "react";

type ReportCardProps = {
  icon: any;
  title: string;
  number: number;
};

const ReportCard = ({ icon: Icon, title, number }: ReportCardProps) => {
  return (
    <section className="bg-white rounded-lg p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        {<Icon />}
        <span>{title}</span>
      </div>

      <span className="font-bold text-2xl">{number}</span>
    </section>
  );
};

export default ReportCard;
