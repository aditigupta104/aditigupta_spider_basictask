import secrets 
from functools import reduce
primeNum= 2**256-1
def polynomial(secret,k):
    return [secret]+[secrets.randbelow(primeNum) for _ in range(k-1)]
def makepoly(poly,x):
    return sum(coeffi*pow(x,i,primeNum) for i, coeffi in enumerate(poly))%primeNum
def shares(secret,n,k):
    poly=polynomial(secret,k)
    share=[(i,makepoly(poly,i)) for i in range(1,n+1)]
    return share
def reconstructSecret(share):
    def lagrange(i):
        xi,_ =share[i] #taking x value of ith share
        numerator=deno=1
        for j,(xj,_) in enumerate(share):
            if i!=j:
                numerator=(numerator*(-xj))%primeNum
                deno=(deno*(xi-xj))%primeNum
        return (share[i][1]*numerator*pow(deno,-1,primeNum))%primeNum
    return sum(lagrange(i) for i in range(len(share)))%primeNum
secret=67897
n=6
k=3
allshares=shares(secret,n,k)
print('all shares:',allshares)
recoveredsecret=reconstructSecret(allshares[:k])
print('recovered secret is= ',recoveredsecret)



