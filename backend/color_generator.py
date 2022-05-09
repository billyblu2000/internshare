import random

def hsl2rgb(h, s, l):
    if s == 0:
        r, g, b = l, l, l
    else:
        q = l * (1 + s) if l < 0.5 else l + s - l * s
        p = 2 * l - q
        r = hue2rgb(p, q, h + 1/3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1/3)
    return [int(r * 255), int(g * 255), int(b * 255)]

def hue2rgb(p, q, t):
    if t < 0: 
        t += 1
    if t > 1: 
        t -= 1
    if t < 1/6:
        return p + (q - p) * 6 * t
    if t < 1/2:
        return q
    if t < 2/3:
        return p + (q - p) * (2/3 - t) * 6
    return p

def rgb2hex(rgb):
    h = ''
    for i in rgb:
        a = str(hex(i))[2:]
        if len(a) == 1:
            h = h + '0' + a
        else:
            h = h + a
    return h

def generate_background_color():
    return "#"+rgb2hex(hsl2rgb(random.uniform(0,1),0.5,0.5))

if __name__ == '__main__':
    print(generate_background_color())