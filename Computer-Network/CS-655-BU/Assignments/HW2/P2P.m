%% Minimun distrubution time for client-server distribution and P2P distribution

clc


F = 15 * 10 ^ 9;     % bits, a file
us = 30 * 10 ^ 6;    % bps, the server upload rate
di = 2 * 10 ^ 6;    % bps, each peer's download rate

% N is the number of peers
% u is the upload rate of each peer
N = [ 10, 100, 1000 ];
u = [ 300, 700, 2000 ] * 10 ^3;  % kbps


for i = 1 : length(u)
    for j = 1 : length(N)
        u(i)
        N(j)
        Dcs = max(N(j) * F / us, F/di)
        Dp2p = max([F/us, F/di, N(j) * F / (us + N(j) * u(i)) ])
    end
end