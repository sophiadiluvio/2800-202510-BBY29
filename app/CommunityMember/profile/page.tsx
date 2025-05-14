import Header from "../../components/navbar/communityMember/header";
import Footer from "../../components/navbar/communityMember/footer";

export default function ProfilePage() {
    const activities = [
      { date: "2025.1.20", activity: "Shelter A" },
      { date: "2025.1.20", activity: "Donation" },
      { date: "2025.1.20", activity: "Shelter B" },
      { date: "2025.1.20", activity: "Shelter C" },
    ];
  
    return (
      <main className="min-h-screen bg-white text-black font-sans">
        
        <Header>
          <h1 className="text-xl font-bold ml-4">Profile</h1>
        </Header>
  
        {/* Profile Info */}
        <div className="flex flex-col items-center mt-6">
          <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center">
            <div className="text-4xl">👤</div>
          </div>
          <div className="mt-2 text-center">
            <p className="font-bold">Full Name</p>
            <p>Email</p>
          </div>
        </div>
  
        {/* Activity Section */}
        <div className="mt-6 text-center">
          <div className="bg-gray-200 py-2 font-bold">My Activity</div>
          {activities.map((item, index) => (
            <div key={index} className="flex justify-between px-10 py-1 border-b">
              <span>{item.date}</span>
              <span>{item.activity}</span>
            </div>
          ))}
        </div>
  
        {/* Buttons */}
        <div className="mt-4 px-6 space-y-2">
          <button className="w-full bg-gray-200 py-2">View Update</button>
          <button className="w-full bg-gray-200 py-2">Volunteer</button>
          <button className="w-full bg-gray-200 py-2">Donation</button>
        </div>
        
        <Footer />
      </main>
    );
  }
  