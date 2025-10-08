import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Gavel, ShoppingCart, Shield, User } from 'lucide-react';

const RoleSelection = ({ onSelectRole }) => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    switch(role) {
      case 'ngo':
        navigate('/ngo/dashboard');
        break;
      case 'regulatory':
        navigate('/regulatory/dashboard');
        break;
      case 'buyer':
        navigate('/buyer/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      default:
        break;
    }
  };

  const roles = [
    {
      id: 'ngo',
      title: 'NGO',
      description: 'Manage carbon projects and track impact',
      icon: <Users className="w-8 h-8 text-emerald-500" />,
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-700'
    },
    {
      id: 'regulatory',
      title: 'Regulatory Body',
      description: 'Verify projects and monitor compliance',
      icon: <Gavel className="w-8 h-8 text-blue-500" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700'
    },
    {
      id: 'buyer',
      title: 'Buyer',
      description: 'Browse and purchase carbon credits',
      icon: <ShoppingCart className="w-8 h-8 text-purple-500" />,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700'
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage platform settings and users',
      icon: <Shield className="w-8 h-8 text-amber-500" />,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Role</h1>
          <p className="text-gray-600">Choose how you want to access the platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all ${role.bgColor} hover:opacity-90`}
            >
              <div className={`w-16 h-16 ${role.bgColor} rounded-full flex items-center justify-center mb-4`}>
                {role.icon}
              </div>
              <h3 className={`text-lg font-semibold ${role.textColor} mb-2`}>{role.title}</h3>
              <p className="text-gray-600 text-center text-sm">{role.description}</p>
            </button>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button 
            onClick={() => navigate('/login')}
            className="text-gray-600 hover:text-gray-900 flex items-center justify-center space-x-2 mx-auto"
          >
            <User className="w-4 h-4" />
            <span>Sign in as individual user</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
