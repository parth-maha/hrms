import useAuthStore from '../store/auth.store'

function Home() {
  const {empId, name,email,roles} = useAuthStore();
  return (
    <div className='pt-3 mt-10 flex justify-center'>
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <p className="text-gray-700 mb-3">
          <strong className="font-semibold">Employee Id:</strong> {empId}
        </p>
        <p className="text-gray-700 mb-3">
          <strong className="font-semibold">Name:</strong> {name}
        </p>
        <p className="text-gray-700 mb-3">
          <strong className="font-semibold">Email:</strong> {email}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold">Roles:</strong> {roles}
        </p>
      </div>
    </div>
  )
}

export default Home