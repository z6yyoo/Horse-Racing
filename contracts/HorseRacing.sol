// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HorseRacing {
    // Daily bonus amount
    uint256 public constant DAILY_BONUS = 1000;

    // Player data structure
    struct Player {
        uint256 points;
        uint256 totalWins;
        uint256 totalRaces;
        uint256 lastClaimDate;
        string displayName;
    }

    // Leaderboard entry
    struct LeaderboardEntry {
        address playerAddress;
        uint256 points;
        uint256 wins;
        string displayName;
    }

    // Mapping from address to player data
    mapping(address => Player) public players;

    // Leaderboard array (top 100)
    address[] public leaderboard;

    // Owner
    address public owner;

    // Events
    event DailyBonusClaimed(address indexed player, uint256 amount, uint256 timestamp);
    event LeaderboardUpdated(address indexed player, uint256 points, uint256 wins);
    event PlayerRegistered(address indexed player, uint256 initialPoints);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    // Get current day (in days since epoch)
    function getCurrentDay() public view returns (uint256) {
        return block.timestamp / 1 days;
    }

    // Check if player can claim daily bonus
    function canClaimDailyBonus(address _player) public view returns (bool) {
        Player memory player = players[_player];
        return getCurrentDay() > player.lastClaimDate;
    }

    // Claim daily bonus (requires wallet signature)
    function claimDailyBonus() external {
        require(canClaimDailyBonus(msg.sender), "Already claimed today");

        Player storage player = players[msg.sender];
        player.points += DAILY_BONUS;
        player.lastClaimDate = getCurrentDay();

        emit DailyBonusClaimed(msg.sender, DAILY_BONUS, block.timestamp);
    }

    // Update player stats (requires wallet signature)
    function updateLeaderboard(
        uint256 _points,
        uint256 _wins,
        uint256 _races,
        string memory _displayName
    ) external {
        Player storage player = players[msg.sender];

        // Update player data
        player.points = _points;
        player.totalWins = _wins;
        player.totalRaces = _races;
        player.displayName = _displayName;

        // Update leaderboard position
        _updateLeaderboardPosition(msg.sender);

        emit LeaderboardUpdated(msg.sender, _points, _wins);
    }

    // Internal function to update leaderboard
    function _updateLeaderboardPosition(address _player) internal {
        // Remove player from current position
        _removeFromLeaderboard(_player);

        // Find correct position and insert
        uint256 playerPoints = players[_player].points;

        if (leaderboard.length == 0) {
            leaderboard.push(_player);
            return;
        }

        // Find insertion point
        uint256 insertIndex = leaderboard.length;
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (playerPoints > players[leaderboard[i]].points) {
                insertIndex = i;
                break;
            }
        }

        // Insert at position (keep max 100)
        if (insertIndex < 100) {
            if (insertIndex == leaderboard.length) {
                leaderboard.push(_player);
            } else {
                leaderboard.push(address(0)); // Add space
                for (uint256 i = leaderboard.length - 1; i > insertIndex; i--) {
                    leaderboard[i] = leaderboard[i - 1];
                }
                leaderboard[insertIndex] = _player;
            }

            // Keep only top 100
            if (leaderboard.length > 100) {
                leaderboard.pop();
            }
        }
    }

    // Remove player from leaderboard
    function _removeFromLeaderboard(address _player) internal {
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i] == _player) {
                for (uint256 j = i; j < leaderboard.length - 1; j++) {
                    leaderboard[j] = leaderboard[j + 1];
                }
                leaderboard.pop();
                break;
            }
        }
    }

    // Get player data
    function getPlayer(address _player) external view returns (
        uint256 points,
        uint256 totalWins,
        uint256 totalRaces,
        uint256 lastClaimDate,
        string memory displayName
    ) {
        Player memory player = players[_player];
        return (
            player.points,
            player.totalWins,
            player.totalRaces,
            player.lastClaimDate,
            player.displayName
        );
    }

    // Get top N leaderboard entries
    function getLeaderboard(uint256 _count) external view returns (LeaderboardEntry[] memory) {
        uint256 count = _count > leaderboard.length ? leaderboard.length : _count;
        LeaderboardEntry[] memory entries = new LeaderboardEntry[](count);

        for (uint256 i = 0; i < count; i++) {
            address playerAddr = leaderboard[i];
            Player memory player = players[playerAddr];
            entries[i] = LeaderboardEntry({
                playerAddress: playerAddr,
                points: player.points,
                wins: player.totalWins,
                displayName: player.displayName
            });
        }

        return entries;
    }

    // Get player rank (1-indexed, 0 if not in leaderboard)
    function getPlayerRank(address _player) external view returns (uint256) {
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i] == _player) {
                return i + 1;
            }
        }
        return 0;
    }

    // Get leaderboard size
    function getLeaderboardSize() external view returns (uint256) {
        return leaderboard.length;
    }
}
