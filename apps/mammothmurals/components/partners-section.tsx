import Image from "next/image";
import React from "react";

function PartnersSection() {
  return (
    <section className="container">
      <h2 className="text-lg text-center font-semibold">Our Partners</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <Image src="/partner1.png" alt="Partner 1" width={100} height={100} />
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
