import pandas as pd
from sklearn.linear_model import LinearRegression


def run_model(csv_path: str):
    data = pd.read_csv(csv_path)
    X = data.drop('target', axis=1)
    y = data['target']
    model = LinearRegression()
    model.fit(X, y)
    print('Model coefficients:', model.coef_)


if __name__ == '__main__':
    import sys
    if len(sys.argv) != 2:
        print('Usage: python analyze.py <csv_path>')
    else:
        run_model(sys.argv[1])
