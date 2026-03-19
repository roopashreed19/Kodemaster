import api from './api'; // Your axios instance

/**
 * Shared logic for completing a challenge and rewarding the user.
 * @param {Object} response - The response object from your judge/run-sql API
 * @param {Function} navigate - The navigate function from useNavigate()
 */
export const handleQuestVictory = (response, navigate) => {
  if (response.data.success) {
    // 1. Show the victory message from the server (+XP)
    alert(`🏆 VICTORY! ${response.data.message}`);

    // 2. Redirect to Dashboard. 
    // This triggers the useEffect in Dashboard.js to fetch the NEW XP from MongoDB.
    navigate('/dashboard');
    return true;
  }
  return false;
};