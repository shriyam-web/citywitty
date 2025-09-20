import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    let resumeUrl = "";
    let resumePublicId = "";

    // Upload to Cloudinary if file exists
    if (body.resumeBase64) {
      const uploadResponse = await cloudinary.uploader.upload(body.resumeBase64, {
        folder: "career_resumes",
        resource_type: "raw", // for PDFs/DOC/DOCX
      });

      resumeUrl = uploadResponse.secure_url;
      resumePublicId = uploadResponse.public_id;
    }

    const application = await CareerApplication.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      dob: body.dob,
      position: body.position,
      joiningAvailability: body.joiningAvailability,
      houseNo: body.houseNo,
      area: body.area,
      city: body.city,
      state: body.state,
      country: body.country || "India",
      experience: body.experience || null,
      qualificationDegree: body.qualificationDegree,
      qualificationPercent: body.qualificationPercent,
      resumeUrl,
      resumePublicId,
      expectedSalary: body.expectedSalary || null,
    });

    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch (error: any) {
    console.error("Career API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
